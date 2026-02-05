import React, { useState, useEffect } from "react";

type Plano = "FREE" | "PRO" | "VITALICIO";

export default function App() {
  const LIMITE_FREE = 3;

  const [plano, setPlano] = useState<Plano>("FREE");
  const [usos, setUsos] = useState(0);
  const [produto, setProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [compra, setCompra] = useState("");
  const [venda, setVenda] = useState("");
  const [resultado, setResultado] = useState("");

  const [pro24hExpiracao, setPro24hExpiracao] = useState<number | null>(null);
  const [tempoRestante, setTempoRestante] = useState<number | null>(null);

  // =============================
  // LOAD INICIAL
  // =============================
  useEffect(() => {
    const planoSalvo = localStorage.getItem("plano") as Plano;
    const usosSalvo = localStorage.getItem("usosHoje");
    const dataSalva = localStorage.getItem("dataUso");
    const expiracaoSalva = localStorage.getItem("pro24h_expiracao");

    const hoje = new Date().toDateString();

    if (planoSalvo) setPlano(planoSalvo);

    if (dataSalva === hoje && usosSalvo) {
      setUsos(parseInt(usosSalvo));
    } else {
      localStorage.setItem("dataUso", hoje);
      localStorage.setItem("usosHoje", "0");
      setUsos(0);
    }

    if (expiracaoSalva) {
      const restante = Number(expiracaoSalva) - Date.now();
      if (restante > 0) {
        setPro24hExpiracao(Number(expiracaoSalva));
        setTempoRestante(restante);
      } else {
        localStorage.removeItem("pro24h_expiracao");
      }
    }
  }, []);

  // =============================
  // CONTADOR PRO24H
  // =============================
  useEffect(() => {
    let intervalo: any;

    if (pro24hExpiracao) {
      intervalo = setInterval(() => {
        const restante = pro24hExpiracao - Date.now();
        if (restante <= 0) {
          clearInterval(intervalo);
          setPro24hExpiracao(null);
          setTempoRestante(null);
          localStorage.removeItem("pro24h_expiracao");
        } else {
          setTempoRestante(restante);
        }
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [pro24hExpiracao]);

  const pro24hAtivo = pro24hExpiracao !== null;

  // =============================
  // CONTROLE DE USO
  // =============================
  function registrarUso() {
    if (plano === "FREE" && !pro24hAtivo) {
      if (usos >= LIMITE_FREE) {
        setResultado("🔒 Limite gratuito atingido. Ative PRO24H ou PRO.");
        return false;
      }
      const novoUso = usos + 1;
      setUsos(novoUso);
      localStorage.setItem("usosHoje", novoUso.toString());
    }
    return true;
  }

  // =============================
  // GERAR ANÚNCIO
  // =============================
  function gerarAnuncio() {
    if (!registrarUso()) return;
    if (!produto) return setResultado("Digite o nome do produto.");
    if (!descricao) return setResultado("Digite a descrição e benefícios.");

    const beneficio = descricao.split(".")[0];

    setResultado(`
                                                                                                                                                                                                                                                                                                                                                                                  🔥 CHEGOU O ${produto.toUpperCase()} QUE TODO MUNDO ESTÁ QUERENDO!

                                                                                                                                                                                                                                                                                                                                                                                  ✔ ${beneficio}
                                                                                                                                                                                                                                                                                                                                                                                  ✔ Alta qualidade
                                                                                                                                                                                                                                                                                                                                                                                  ✔ Ótimo custo-benefício
                                                                                                                                                                                                                                                                                                                                                                                  ✔ Ideal para revenda ou uso próprio

                                                                                                                                                                                                                                                                                                                                                                                  ⚡ Estoque limitado!
                                                                                                                                                                                                                                                                                                                                                                                  💨 Envio rápido e seguro

                                                                                                                                                                                                                                                                                                                                                                                  #Promoção #Oferta #Desconto #${produto.replace(
                                                                                                                                                                                                                                                                                                                                                                                    /\s+/g,
                                                                                                                                                                                                                                                                                                                                                                                    ""
                                                                                                                                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                                                                                                                                      `);
  }

  // =============================
  // RESPOSTAS WHATSAPP IA
  // =============================
  function gerarRespostasWhatsAppIA() {
    if (!registrarUso()) return;

    if (!produto || !descricao) {
      return setResultado(
        "Preencha nome do produto e descrição para gerar respostas."
      );
    }

    const beneficio = descricao.split(".")[0];

    setResultado(`
                                                                                                                                                                                                                                                                                                                                                                                                                                        📲 RESPOSTAS WHATSAPP – FOCO EM CONVERSÃO

                                                                                                                                                                                                                                                                                                                                                                                                                                        1️⃣ Primeiro Contato:
                                                                                                                                                                                                                                                                                                                                                                                                                                        Olá 👋 Temos o ${produto} disponível!
                                                                                                                                                                                                                                                                                                                                                                                                                                        ${beneficio}.
                                                                                                                                                                                                                                                                                                                                                                                                                                        Quer que eu te envie fotos e condições especiais?

                                                                                                                                                                                                                                                                                                                                                                                                                                        2️⃣ Cliente pede desconto:
                                                                                                                                                                                                                                                                                                                                                                                                                                        Consigo sim melhorar o valor 😉
                                                                                                                                                                                                                                                                                                                                                                                                                                        Se você fechar agora, consigo liberar condição especial + envio rápido.

                                                                                                                                                                                                                                                                                                                                                                                                                                        3️⃣ Cliente pergunta prazo:
                                                                                                                                                                                                                                                                                                                                                                                                                                        Enviamos imediatamente após confirmação.
                                                                                                                                                                                                                                                                                                                                                                                                                                        Entrega média de 1 a 3 dias úteis 📦

                                                                                                                                                                                                                                                                                                                                                                                                                                        4️⃣ Gatilho de urgência:
                                                                                                                                                                                                                                                                                                                                                                                                                                        ⚡ Estamos com poucas unidades do ${produto}.
                                                                                                                                                                                                                                                                                                                                                                                                                                        Esse valor promocional pode sair a qualquer momento.

                                                                                                                                                                                                                                                                                                                                                                                                                                        5️⃣ Fechamento:
                                                                                                                                                                                                                                                                                                                                                                                                                                        Posso confirmar seu pedido agora e garantir esse preço pra você? 🚀
                                                                                                                                                                                                                                                                                                                                                                                                                                            `);
  }

  // =============================
  // CALCULADORA
  // =============================
  function calcularLucro() {
    if (!registrarUso()) return;

    const precoCompra = parseFloat(compra);
    const precoVenda = parseFloat(venda);

    if (isNaN(precoCompra) || isNaN(precoVenda))
      return setResultado("Preencha valores corretamente.");

    const lucro = precoVenda - precoCompra;
    const margem = (lucro / precoVenda) * 100;
    const roi = (lucro / precoCompra) * 100;

    setResultado(`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            📊 ANÁLISE ESTRATÉGICA

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            💰 Lucro: R$ ${lucro.toFixed(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            📈 Margem: ${margem.toFixed(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            )}%
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            🚀 ROI: ${roi.toFixed(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            )}%
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                `);
  }

  // =============================
  // PRO24H
  // =============================
  function ativarPro24h() {
    const codigo = prompt("Digite código PRO24H:");
    if (codigo === "PRO24H-ELIZEU") {
      const expiracao = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("pro24h_expiracao", expiracao.toString());
      setPro24hExpiracao(expiracao);
      setTempoRestante(24 * 60 * 60 * 1000);
      alert("PRO 24H ativado!");
    } else {
      alert("Código inválido.");
    }
  }

  function ativarPRO() {
    const codigo = prompt("Código PRO Mensal:");
    if (codigo === "PRO2026") {
      setPlano("PRO");
      localStorage.setItem("plano", "PRO");
      alert("PRO ativado!");
    } else alert("Código inválido.");
  }

  function ativarVIP() {
    const codigo = prompt("Código VITALÍCIO:");
    if (codigo === "VIP2026") {
      setPlano("VITALICIO");
      localStorage.setItem("plano", "VITALICIO");
      alert("Vitalício ativado!");
    } else alert("Código inválido.");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>🚀 Máquina de Vendas</h1>

      <p style={{ textAlign: "center" }}>
        Plano:
        {pro24hAtivo
          ? " PRO24H 🔥"
          : plano === "FREE"
          ? ` FREE (${LIMITE_FREE - usos} usos restantes)`
          : plano === "PRO"
          ? " PRO Mensal 🔥"
          : " VITALÍCIO 💎"}
      </p>

      {pro24hAtivo && tempoRestante && (
        <p style={{ textAlign: "center", color: "#22c55e" }}>
          Tempo restante: {Math.floor(tempoRestante / 60000)} minutos
        </p>
      )}

      <div style={styles.card}>
        <h2>Gerador de Anúncio</h2>
        <input
          style={styles.input}
          placeholder="Nome do Produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Descrição e benefícios"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button style={styles.button} onClick={gerarAnuncio}>
          Gerar Anúncio
        </button>
      </div>

      <div style={styles.card}>
        <h2>Respostas WhatsApp IA</h2>
        <button style={styles.button} onClick={gerarRespostasWhatsAppIA}>
          Gerar Respostas
        </button>
      </div>

      <div style={styles.card}>
        <h2>Calculadora</h2>
        <input
          style={styles.input}
          type="number"
          placeholder="Preço Compra"
          value={compra}
          onChange={(e) => setCompra(e.target.value)}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Preço Venda"
          value={venda}
          onChange={(e) => setVenda(e.target.value)}
        />
        <button style={styles.button} onClick={calcularLucro}>
          Calcular Lucro
        </button>
      </div>

      <div style={styles.card}>
        <h2>Planos</h2>
        <button style={styles.button} onClick={ativarPro24h}>
          Ativar PRO24H
        </button>
        <button style={styles.button} onClick={ativarPRO}>
          Ativar PRO Mensal
        </button>
        <button style={styles.button} onClick={ativarVIP}>
          Ativar VITALÍCIO
        </button>
      </div>

      {resultado && (
        <div style={styles.resultado}>
          <div style={{ whiteSpace: "pre-wrap" }}>{resultado}</div>
        </div>
      )}
    </div>
  );
}

const styles: any = {
  container: {
    maxWidth: 700,
    margin: "auto",
    padding: 20,
    fontFamily: "Arial",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },
  titulo: { textAlign: "center", color: "#22c55e" },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "none",
  },
  textarea: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "none",
    minHeight: 80,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#22c55e",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: 5,
  },
  resultado: {
    backgroundColor: "#0b1220",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
};
