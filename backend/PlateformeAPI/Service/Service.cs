using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace PlateformeAPI.Services;

public class GeminiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public GeminiService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["GeminiApiKey"] ?? throw new Exception("Clé API Gemini manquante dans appsettings.json");
    }

    public async Task<string> AnalyserCvAsync(string texteCv)
    {
        // Le prompt force l'IA à répondre UNIQUEMENT en JSON pur
        var prompt = $@"Tu es un expert en recrutement et en analyse de CV. 
Analyse le texte du CV suivant et retourne UNIQUEMENT un objet JSON valide (sans balises markdown comme ```json) correspondant exactement à cette structure :

{{
  ""scoreGlobal"": int,
  ""compatibiliteATS"": {{ ""score"": int, ""maxScore"": 30, ""elementsAmeliorer"": [""string""] }},
  ""coordonnees"": {{ ""score"": int, ""maxScore"": 20, ""elementsAmeliorer"": [""string""] }},
  ""softSkills"": {{ ""score"": int, ""maxScore"": 15, ""elementsAmeliorer"": [""string""] }},
  ""experiences"": {{ ""score"": int, ""maxScore"": 20, ""elementsAmeliorer"": [""string""] }},
  ""impact"": {{ ""score"": int, ""maxScore"": 15, ""elementsAmeliorer"": [""string""] }}
}}

Texte du CV à analyser :
{texteCv}";

        // Structure de la requête attendue par l'API Gemini
        var requestBody = new
        {
            contents = new[]
            {
                new {
                    parts = new[] { new { text = prompt } }
                }
            },
            generationConfig = new {
                responseMimeType = "application/json" // Force la réponse en JSON pur
            }
        };

        var jsonContent = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        
        // URL de l'API Gemini 1.5 Flash
        var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={_apiKey}";

        var response = await _httpClient.PostAsync(url, jsonContent);
        response.EnsureSuccessStatusCode();

        var responseString = await response.Content.ReadAsStringAsync();
        var jsonDoc = JsonNode.Parse(responseString);

        // Extraction du texte de la réponse de Gemini
        var reponseBrute = jsonDoc?["candidates"]?[0]?["content"]?["parts"]?[0]?["text"]?.ToString() ?? "{}";

        // Nettoyage de sécurité au cas où l'IA ajouterait des balises markdown
        return reponseBrute.Replace("```json", "").Replace("```", "").Trim();
    }
}