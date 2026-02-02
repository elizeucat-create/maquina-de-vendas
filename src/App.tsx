import React, { useState, useEffect } from "react";

type Plano = "FREE" | "PRO" | "VITALICIO";

export default function App() {
  const LIMITE_FREE = 3;

  const [plano, setPlano] = useState<Plano>("FREE");
  const [usos, setUsos] = useState(0);
  const [produto, setProduto] = useState("");
  const [compra, setCompra] = useState("");
  const [venda, setVenda] = useState("");
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    const planoSalvo = localStorage.getItem("plano") as Plano;
    const usosSalvo = localStorage.getItem("usosHoje");
    const dataSalva = localStorage.getItem("dataUso");
    const hoje = new Date().toDateString();

    if (planoSalvo) setPlano(planoSalvo);

    if (dataSalva === hoje && usosSalvo) {
      setUsos(parseInt(usosSalvo));
    } else {
      localStorage.setItem("dataUso", hoje);
      localStorage.setItem("usosHoje", "0");
      setUsos(0);
    }
  }, []);

  function registrarUso() {
    if (plano === "FREE") {
      setResultado(
        "🔒 Você atingiu o limite gratuito de hoje.\n\nAtualize para PRO e tenha uso ilimitado para vender todos os dias."
      );
      {
        setResultado(
          "🔒 Limite diário atingido. Faça upgrade para PRO ou VITALÍCIO."
        );
        return false;
      }
      const novoUso = usos + 1;
      setUsos(novoUso);
      localStorage.setItem("usosHoje", novoUso.toString());
    }
    return true;
  }

  function gerarAnuncio() {
    if (!registrarUso()) return;
    if (!produto) return setResultado("Digite o nome do produto.");

    const seo = produto.toLowerCase().replace(/\s+/g, "");

    setResultado(`
                                                                                                                                                          🔥 ${produto.toUpperCase()} COM PREÇO IMPERDÍVEL!

                                                                                                                                                          ✔ Alta qualidade
                                                                                                                                                          ✔ Excelente custo-benefício
                                                                                                                                                          ✔ Ideal para revenda
                                                                                                                                                          ✔ Envio rápido

                                                                                                                                                          ⚡ Estoque limitado!
                                                                                                                                                          Garanta o seu agora.

                                                                                                                                                          #${seo} #Promoção #Oferta #Desconto #FreteRápido
                                                                                                                                                          `);
  }

  function calcularLucro() {
    if (!registrarUso()) return;

    const precoCompra = parseFloat(compra);
    const precoVenda = parseFloat(venda);

    if (isNaN(precoCompra) || isNaN(precoVenda))
      return setResultado("Preencha os valores corretamente.");

    const lucro = precoVenda - precoCompra;
    const margem = (lucro / precoVenda) * 100;
    const roi = (lucro / precoCompra) * 100;

    let classificacao = "⚠ Margem baixa.";
    if (margem >= 40) classificacao = "🔥 Produto Excelente!";
    else if (margem >= 25) classificacao = "✅ Boa oportunidade.";

    const preco40 = precoCompra / (1 - 0.4);
    const preco50 = precoCompra / (1 - 0.5);

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

                                                                                                                                                                                                                        🎯 ${classificacao}

                                                                                                                                                                                                                        💡 Sugestão de Preço:
                                                                                                                                                                                                                        • 40% margem → R$ ${preco40.toFixed(
                                                                                                                                                                                                                          2
                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                        • 50% margem → R$ ${preco50.toFixed(
                                                                                                                                                                                                                          2
                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                        `);
  }

  function gerarWhatsApp() {
    if (!registrarUso()) return;

    setResultado(`
                                                                                                                                                                                                                                    📲 RESPOSTAS PRONTAS:

                                                                                                                                                                                                                                    1️⃣ Primeiro contato:
                                                                                                                                                                                                                                    Olá! 👋 Temos disponível sim. Produto original e envio rápido.

                                                                                                                                                                                                                                    2️⃣ Pedido de desconto:
                                                                                                                                                                                                                                    Consigo melhorar o valor para fechar agora 😉

                                                                                                                                                                                                                                    3️⃣ Prazo:
                                                                                                                                                                                                                                    Envio rápido e seguro.

                                                                                                                                                                                                                                    4️⃣ Urgência:
                                                                                                                                                                                                                                    Últimas unidades disponíveis ⚡

                                                                                                                                                                                                                                    5️⃣ Fechamento:
                                                                                                                                                                                                                                    Posso confirmar seu pedido?
                                                                                                                                                                                                                                    `);
  }

  function copiar() {
    navigator.clipboard.writeText(resultado);
    alert("Copiado!");
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

  function pagarPix() {
    alert(
      "Pagamento via PIX: 11761897780\nApós pagamento, solicite seu código."
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>🚀 Máquina de Vendas</h1>

      <p style={{ textAlign: "center" }}>
        Plano atual:{" "}
        {plano === "FREE"
          ? `FREE (${LIMITE_FREE - usos} usos restantes hoje)`
          : plano === "PRO"
          ? "PRO Mensal 🔥"
          : "VITALÍCIO 💎"}
      </p>

      <div style={styles.card}>
        <h2>Gerador de Anúncio</h2>
        <input
          style={styles.input}
          placeholder="Nome do Produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />
        <button style={styles.button} onClick={gerarAnuncio}>
          Gerar
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
          Calcular
        </button>
      </div>

      <div style={styles.card}>
        <h2>Respostas WhatsApp</h2>
        <button style={styles.button} onClick={gerarWhatsApp}>
          Gerar
        </button>
      </div>

      <div style={styles.card}>
        <h2>Planos</h2>
        <button style={styles.button} onClick={ativarPRO}>
          Ativar PRO (R$29,90)
        </button>
        <button style={styles.button} onClick={ativarVIP}>
          Ativar VITALÍCIO (R$97)
        </button>
        <button style={styles.pixButton} onClick={pagarPix}>
          Pagar via PIX
        </button>
      </div>

      {resultado && (
        <div style={styles.resultado}>
          <div style={{ whiteSpace: "pre-wrap" }}>{resultado}</div>
          <button style={styles.button} onClick={copiar}>
            Copiar
          </button>
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
  pixButton: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#facc15",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultado: {
    backgroundColor: "#0b1220",
    padding: 15,
    borderRadius: 10,
    color: "#ffffff",
    whiteSpace: "pre-wrap",
    fontSize: 14,
    lineHeight: 1.6,
  },
};
