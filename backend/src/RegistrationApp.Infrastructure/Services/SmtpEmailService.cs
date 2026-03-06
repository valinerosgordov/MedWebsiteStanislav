using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RegistrationApp.Core.Interfaces;

namespace RegistrationApp.Infrastructure.Services;

public class SmtpEmailService(IConfiguration configuration, ILogger<SmtpEmailService> logger) : IEmailService
{
    public async Task SendPasswordResetEmailAsync(string toEmail, string resetToken, CancellationToken ct = default)
    {
        var smtp = configuration.GetSection("Smtp");
        var host = smtp["Host"];
        var port = int.Parse(smtp["Port"] ?? "587");
        var username = smtp["Username"];
        var password = smtp["Password"];
        var fromEmail = smtp["FromEmail"] ?? username;
        var fromName = smtp["FromName"] ?? "Федерация специалистов превентивного здоровья";
        var frontendUrl = configuration["Cors:Origins:0"] ?? "http://localhost:5173";

        if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(username))
        {
            logger.LogWarning("[Email] SMTP not configured. Reset token for {Email}: {Token}", toEmail, resetToken);
            return;
        }

        var resetLink = $"{frontendUrl}/forgot-password?email={Uri.EscapeDataString(toEmail)}&token={Uri.EscapeDataString(resetToken)}";

        var body = $"""
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
                <div style="background: linear-gradient(135deg, #2d5a47, #50846e); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
                    <h1 style="color: #fff; margin: 0; font-size: 22px;">Восстановление пароля</h1>
                </div>
                <div style="background: #fff; padding: 32px; border: 1px solid #ddd9d4; border-top: none; border-radius: 0 0 12px 12px;">
                    <p style="color: #333; font-size: 15px; line-height: 1.6;">
                        Вы получили это письмо, потому что был запрошен сброс пароля для вашей учётной записи
                        в Федерации специалистов превентивного здоровья и питания.
                    </p>
                    <div style="text-align: center; margin: 28px 0;">
                        <a href="{resetLink}"
                           style="display: inline-block; background: #50846e; color: #fff; padding: 14px 32px;
                                  border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
                            Сбросить пароль
                        </a>
                    </div>
                    <p style="color: #666; font-size: 13px; line-height: 1.5;">
                        Если кнопка не работает, скопируйте и вставьте в браузер эту ссылку:<br/>
                        <a href="{resetLink}" style="color: #50846e; word-break: break-all;">{resetLink}</a>
                    </p>
                    <p style="color: #666; font-size: 13px;">
                        Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.
                    </p>
                </div>
                <p style="color: #999; font-size: 12px; text-align: center; margin-top: 16px;">
                    Федерация специалистов превентивного здоровья и питания
                </p>
            </div>
            """;

        using var client = new SmtpClient(host, port)
        {
            Credentials = new NetworkCredential(username, password),
            EnableSsl = true
        };

        var message = new MailMessage
        {
            From = new MailAddress(fromEmail!, fromName),
            Subject = "Восстановление пароля — Федерация",
            Body = body,
            IsBodyHtml = true
        };
        message.To.Add(toEmail);

        try
        {
            await client.SendMailAsync(message, ct).ConfigureAwait(false);
            logger.LogInformation("[Email] Password reset email sent to {Email}", toEmail);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "[Email] Failed to send password reset email to {Email}", toEmail);
        }
    }
}
