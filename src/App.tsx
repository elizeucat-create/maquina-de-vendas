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
      if (usos >= LIMITE_FREE) {
        setResultado(
          "🔒 Limite gratuito atingido. Faça upgrade para PRO ou VITALÍCIO para uso ilimitado."
        );
        return false;
      }
      const novoUso = usos + 1;
      setUsos(novoUso);
      localStorage.setItem("usosHoje", novoUso.toString());
    }
    return true;
  }

  // Função para gerar hashtags SEO
  function gerarHashtags(produto: string, descricao: string) {
    const nomeLimpo = produto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
    const palavrasChave = descricao
      .toLowerCase()
      .split(/[\s,.!?]+/)
      .filter((w) => w.length > 3);
    const hashtags = new Set<string>();

    hashtags.add(`#${nomeLimpo}`);
    hashtags.add(`#Oferta${produto.replace(/\s+/g, "")}`);
    palavrasChave.forEach((palavra) => {
      const tag = palavra.replace(/[^a-zA-Z0-9]/g, "");
      if (tag.length > 2) hashtags.add(`#${tag}`);
    });
    hashtags.add("#Promoção");
    hashtags.add("#OfertaImperdível");
    hashtags.add("#Desconto");

    return Array.from(hashtags).join(" ");
  }

  // Gerador de anúncio persuasivo
  function gerarAnuncio() {
    if (!registrarUso()) return;
    if (!produto) return setResultado("Digite o nome do produto.");
    if (!descricao)
      return setResultado("Digite a descrição e benefícios do produto.");

    const beneficioPrincipal = descricao.split(".")[0] || "excelente qualidade";
    const hashtags = gerarHashtags(produto, descricao);

    const texto = `
🔥 CHEGOU O ${produto.toUpperCase()} QUE TODO MUNDO ESTÁ QUERENDO! 🔥

✔ ${beneficioPrincipal}
✔ Alta qualidade
✔ Ótimo custo-benefício
✔ Perfeito para revenda ou uso próprio

⚡ Estoque limitado! Garanta o seu agora antes que acabe!
💨 Envio rápido e seguro.

${hashtags}
    `;
    setResultado(texto);
  }

  // Calculadora de lucro, margem e ROI
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

💰 Lucro: R$ ${lucro.toFixed(2)}
📈 Margem: ${margem.toFixed(1)}%
🚀 ROI: ${roi.toFixed(1)}%

🎯 ${classificacao}

💡 Sugestão de Preço:
• 40% margem → R$ ${preco40.toFixed(2)}
• 50% margem → R$ ${preco50.toFixed(2)}
    `);
  }

  // Respostas WhatsApp IA
  function gerarRespostasWhatsAppIA() {
    if (!registrarUso()) return;
    if (!produto || !descricao) {
      return setResultado(
        "Preencha produto e descrição para gerar respostas inteligentes."
      );
    }

    const beneficioPrincipal = descricao.split(".")[0] || "excelente qualidade";
    const estoque = 5;

    const respostas = {
      primeiroContato: `Olá! 👋 Temos o ${produto}, ${beneficioPrincipal}. Posso te passar mais detalhes e fotos se quiser!`,
      pedidoDesconto: `Entendo que quer um bom preço! 😊 Posso oferecer um desconto especial se você fechar agora, garantindo ${produto} com envio rápido e seguro.`,
      prazoEntrega: `O ${produto} é enviado imediatamente após a confirmação do pedido. Estimativa de entrega: 1-3 dias úteis dependendo da sua região. 📦`,
      urgencia: `⚡ Atenção! Temos apenas ${estoque} unidades disponíveis do ${produto}. Não perca a chance de garantir o seu antes que acabe!`,
      fechamento: `Se quiser, posso confirmar seu pedido de ${produto} agora e garantir o melhor preço + envio rápido. 🚀`,
    };

    const textoFormatado = `
📲 RESPOSTAS WHATSAPP (IA):

1️⃣ Primeiro contato:
${respostas.primeiroContato}

2️⃣ Pedido de desconto:
${respostas.pedidoDesconto}

3️⃣ Prazo de entrega:
${respostas.prazoEntrega}

4️⃣ Urgência / Estoque limitado:
${respostas.urgencia}

5️⃣ Fechamento:
${respostas.fechamento}
    `;

    setResultado(textoFormatado);
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
        <textarea
          style={styles.textarea}
          placeholder="Descrição e benefícios do produto"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button style={styles.button} onClick={gerarAnuncio}>
          Gerar Anúncio
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
        <h2>Respostas WhatsApp IA</h2>
        <button style={styles.button} onClick={gerarRespostasWhatsAppIA}>
          Gerar Respostas Inteligentes
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
            Copiar Texto
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
  textarea: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "none",
    minHeight: 80,
    resize: "vertical",
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
    marginTop: 20,
  },
};
