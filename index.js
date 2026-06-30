const d = document,
  $card = d.getElementById("quote-card"),
  $author = d.getElementById("author"),
  $tags = d.getElementById("tags"),
  $quote = d.getElementById("quote");

let currentQuote = null;

const getQuote = async () => {
  try {
    let res = await fetch(
        "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json",
      ),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    const index = Math.floor(Math.random() * json.length);

    const randomQuote = json[index];

    return randomQuote;
  } catch (err) {
    let message = err.statusText || "An error ocurred";

    $card.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</b></p>`,
    );
  }
};

const showQuote = async () => {
  $tags.innerHTML = "";

  const quote = await getQuote();
  currentQuote = quote;

  quote.tags.forEach((tag) => {
    const $span = d.createElement("span");
    $span.textContent = tag;
    $span.classList.add("text-light-lavender", "bg-board-dark-gray");
    $span.style.padding = "0.5rem 1rem";
    $span.style.marginInline = "0.3rem";
    $span.style.borderRadius = "20px";
    $span.style.border = "1px solid #aeb0ff";
    $tags.appendChild($span);
  });

  $author.textContent = quote.author;
  $quote.textContent = quote.quote;
};

const shareQuote = async () => {
  // Por si la primera cita no esta cargada cuando se da click 
  if (!currentQuote) return;

  const shareText = `"${currentQuote.quote}" - ${currentQuote.author}`;

  try {
    await navigator.share({
      text: shareText,
    });
  } catch (err) {
    console.error(err);
  }
};

d.addEventListener("DOMContentLoaded", showQuote);

d.addEventListener("click", (e) => {
  if (e.target.matches("#btn-random")) {
    showQuote();
  }

  if (e.target.matches("#btn-share")) {
    shareQuote();
  }
});
