using System.Net;
using System.Net.Mail;

namespace PlateformeAPI.Services;

public class EmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task EnvoyerAsync(string destinataire, string sujet, string corpsHtml)
    {
        var host = _config["Email:Host"];

        if (string.IsNullOrEmpty(host))
        {
            _logger.LogWarning("Email non configuré. Message pour {Destinataire} : {Corps}", destinataire, corpsHtml);
            return;
        }

        var user = _config["Email:User"];
        var from = _config["Email:From"] ?? user;

        _logger.LogInformation("Tentative d'envoi à {Destinataire} via {Host}", destinataire, host);

        using var client = new SmtpClient(host, int.Parse(_config["Email:Port"] ?? "587"))
        {
            EnableSsl = true,
            Timeout = 15000,
            Credentials = new NetworkCredential(user, _config["Email:Password"])
        };

        using var message = new MailMessage(from!, destinataire, sujet, corpsHtml) { IsBodyHtml = true };
        await client.SendMailAsync(message);

        _logger.LogInformation("Email accepté par le serveur pour {Destinataire}", destinataire);
    }
}