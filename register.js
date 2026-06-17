import express from 'express';
import cors from 'cors';
import compression from 'compression';
import admin from 'firebase-admin';

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());

const firebaseConfig = {
  type: "service_account",
  project_id: "foxyz-mobile",
  private_key_id: "60dfcaf05e151ebc036a2627bb5fe69b18b1544e",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6T0eIrTUXiGSF\nX52jiYBL1Rr8+gwhvJwMaTsktUfcKc7uWVj4O92GGrFvGYrMBeSCsdXRvpB4bIGv\nx9W9ZRU0i5LRLOEgIEsBy0b9mE1mLIyP7rOyG0YSpSrtpQTWuFouyi9iAhS9/Zu1\n7lAgpNxVBUqB9PnlNJ6P9nJUXcVNGQ9HlWER0Y3wtrSAXQQ0ICk+IV29g/8J/1OP\n5+AP0VR84KCmUT5+ecC2R+tNa6fQRd5TgoQVUSR0j7uVhfUHdCobbdnc4/V47yz3\n2bAYjVMJNlnb530crfstLQYg4ZZWtV+QCwXNoo+Pjs8qxEDyP8BoHN525hTXkurV\n238BJJELAgMBAAECggEAVRkqLOkkg3u2ol7yo4SGN9z+Z0eVLAG460hTjehJiuwD\ny0W/SB8cB4mAuyTZC2izn+i3qAaZeY/iSpaF7+zQW0BXTrjnmWN2rzqY0fNzgvRd\nPc8DgBpKDvEnYwXJaIQrGQ0byHH35HIG4foY2lhDFYiFqEdrr0AyHsKsJRHxsU01\nDDWb13qJHqsNmHOM1MkJAZlB4XpOxSR2cKlQvxUPTbxKtO9obxRT2t1uL0zWewUG\nS071I35zEwI78elM6TRuSt4rqk0fbr3ju5DlI3Kj7X7T874ogvAbV8BqiD8Ec7Fn\nGDra0JveOUulfyr1TUxIjdOeoIZyfsSIf28GZdH0xQKBgQDwT64COAmcKQ/mOnoW\n9/HYwzznOFmv03SSyKc9oa5dOIN4FKFw39DsH9egSyZGCsyxosAdNuRG4OwNjhFz\nJ2DCYGuAUwleg8zIYgtffPnoU3qfLJtKaZLZm0ydfCSLPW8Ij5WUESlh1Nl7Sr0G\nvAP5Y0Xvl1xNRqEBZ6Q6fBdMBwKBgQDGeRJqpb9WBT3cobvVQ+VeF/x6KDQPlRC5\nSSR18HU9zkS4u4oNLsIwC6DsbiZs7+8aomPN5TBrXFtIf5vSiart/XreXTxPuqPh\nCMpylygGriH28iOhIpfa/uDUZKLvyT34IQVdl6AfIkl65kWGVMAnuVqUK10p37nN\n2/Ez2DrZ3QKBgF6KimO3FhjIkse5o8SbgRsNHE2+/pHMt+TzadA2ZnmoPRilzSmx\n8+ihUlxulD0kDImqBLi5mq9D17oxdS3/hPKTqldO07XKVmtTHzRO36aGCQzMKL/q\nrupLTaX7bAkXfzI4AtnAsq4ZZgI6UglvOIUJiD8NJjQEoF0EIDkeDrBLAoGAJq6Q\nJVL6kKRi4y5ucmlSOd2I6rINO4A9Cy+zOH1ODGa4RBzhEiKr3DtX+NybBp5YxqMh\nuo5Ruor8i4u7bfRA6TN/D/mx+IQSzpgtBNprBapIml2lDhG08Qy9+wdGLl/VgRfG\nePBFV+wR0C8zG7RG4zcf7ULqXG/rQbD9OLKK/c0CgYEAvb6C7m8PZezXEom+wo5B\nigdmiD4vP6so8sqDnVDFrWZYEF6gy0zHcfMU1GsWa1iCOedJ1XG9sqAMAifX0bhn\nfICqFkukuxPSO6k9fAWtoKRi5tx/ie7Z3SO61R/II/0te5mhFPW3cswVutz6Uttu\n/uZvtWmNSdCeyc9MUyLVi9M\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@foxyz-mobile.iam.gserviceaccount.com",
  client_id: "100387621091047922319",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40foxyz-mobile.iam.gserviceaccount.com"
};

try {
  admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });
} catch (e) { console.error(e); }

const db = admin.firestore();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Union - Registro</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
            body { background: #0a0b0e; color: #e2e8f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            body::before { content: ''; position: absolute; width: 350px; height: 350px; background: #0052ff; border-radius: 50%; filter: blur(160px); top: 15%; left: 15%; z-index: 1; }
            .box { background: #11131a; padding: 40px; border-radius: 12px; border: 1px solid #1e2640; width: 100%; max-width: 420px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.6); z-index: 10; position: relative; }
            h2 { font-size: 26px; font-weight: 800; letter-spacing: 1px; color: #fff; margin-bottom: 5px; }
            h2 span { color: #0052ff; }
            p.subtitle { color: #64748b; font-size: 14px; margin-bottom: 25px; }
            .input-group { margin: 15px 0; text-align: left; }
            label { font-size: 11px; color: #94a3b8; display: block; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
            input { width: 100%; padding: 12px 16px; background: #181a24; border: 1px solid #27314d; border-radius: 8px; color: #fff; font-size: 14px; transition: 0.3s; }
            input:focus { border-color: #0052ff; outline: none; }
            button { width: 100%; padding: 14px; background: linear-gradient(90deg, #0052ff, #00d2ff); border: none; color: #fff; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 10px; box-shadow: 0 4px 15px rgba(0, 82, 255, 0.4); }
            #response { margin-top: 20px; padding: 12px; border-radius: 8px; display: none; font-size: 14px; font-weight: 600; }
        </style>
    </head>
    <body>
        <div class="box">
            <h2>PROJECT<span> UNION</span></h2>
            <p class="subtitle">Criar Conta Oficial do Jogo</p>
            <form id="regForm">
                <div class="input-group">
                    <label>ID exclusivo do Jogador</label>
                    <input type="text" id="jogadorId" placeholder="Insira o seu ID de Login" required>
                </div>
                <div class="input-group">
                    <label>Nickname desejado</label>
                    <input type="text" id="nickname" placeholder="Insira o seu Apelido" required>
                </div>
                <div class="input-group">
                    <label>Chave de Acesso (Key)</label>
                    <input type="text" id="activationKey" placeholder="Insira uma Key Válida" required>
                </div>
                <button type="submit">CRIAR MINHA CONTA</button>
            </form>
            <div id="response"></div>
        </div>
        <script>
            document.getElementById('regForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const responseBox = document.getElementById('response');
                responseBox.style.display = "none";
                
                try {
                    const res = await fetch('/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jogadorId: document.getElementById('jogadorId').value.trim(),
                            nickname: document.getElementById('nickname').value.trim(),
                            key: document.getElementById('activationKey').value.trim()
                        })
                    });
                    const data = await res.json();
                    responseBox.style.background = res.ok ? "rgba(0, 82, 255, 0.15)" : "rgba(239, 68, 68, 0.15)";
                    responseBox.style.color = res.ok ? "#38bdf8" : "#f87171";
                    responseBox.style.border = res.ok ? "1px solid #0052ff" : "1px solid #ef4444";
                    responseBox.innerText = data.message || data.error;
                    responseBox.style.display = "block";
                } catch (err) {
                    responseBox.style.display = "block";
                    responseBox.innerText = "Erro ao conectar com o servidor Union.";
                }
            });
        </script>
    </body>
    </html>
  `);
});

app.post('/register', async (req, res) => {
  const { jogadorId, nickname, key } = req.body;
  if (!jogadorId || !nickname || !key) return res.status(400).json({ error: "Todos os campos são obrigatórios." });

  try {
    const keyRef = db.collection('keys').doc(key);
    const keyDoc = await keyRef.get();

    if (!keyDoc.exists || keyDoc.data().usada === true) {
      return res.status(403).json({ error: "Key inválida ou já utilizada." });
    }

    const userRef = db.collection('usuarios').doc(jogadorId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return res.status(400).json({ error: "Este ID de Jogador já está registrado." });
    }

    await userRef.set({
      jogadorId,
      nickname,
      nivel: 1,
      ouro: 10000,
      diamantes: 1000,
      status: "No Lobby",
      criadoEm: admin.firestore.FieldValue.serverTimestamp()
    });

    await db.collection('inventarios').doc(jogadorId).set({
      skins_armas: ["M4A1_Original", "AK47_Fogo"],
      personagens: ["Default"]
    });

    await keyRef.update({ usada: true, utilizadaPor: jogadorId });

    return res.status(200).json({ message: "Conta criada com total sucesso! Já pode abrir o jogo." });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno ao processar cadastro no Firestore." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[Union] Register ativo na porta ${PORT}`));
