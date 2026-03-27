import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

# Cargar .env desde la raíz
load_dotenv('../.env')

def test_gmail():
    sender_email = os.environ.get('EMAIL_USER', 'arressarton@gmail.com').strip()
    sender_password = os.environ.get('EMAIL_PASS', '').replace(' ', '').strip()
    
    print(f"--- PRUEBA DE CORREO GMAIL ---")
    print(f"Email: {sender_email}")
    print(f"Password Clean: {sender_password[:2]}****{sender_password[-2:]} (Largo: {len(sender_password)})")
    
    if len(sender_password) != 16:
        print("❌ ERROR: La contraseña debe tener exactamente 16 caracteres (sin contar espacios).")
        return

    msg = MIMEText("Esta es una prueba de conexión desde el script de test.")
    msg['Subject'] = "Prueba de Conexión AthenaBall"
    msg['From'] = sender_email
    msg['To'] = sender_email

    try:
        print("Conectando a smtp.gmail.com:587 (TLS)...")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.set_debuglevel(1) # Esto mostrará todo el diálogo con Google
        server.starttls()
        print("Intentando login...")
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, sender_email, msg.as_string())
        server.quit()
        print("\n✅ ¡ÉXITO! El correo de prueba se envió correctamente.")
    except Exception as e:
        print(f"\n❌ FALLÓ EL TEST: {e}")
        print("\n💡 POSIBLES CAUSAS:")
        print("1. La contraseña de aplicación es incorrecta.")
        print("2. Google bloqueó el acceso (revisa tu email para alertas de seguridad).")
        print("3. La Verificación en 2 pasos no está activa en tu cuenta.")

if __name__ == "__main__":
    test_gmail()
