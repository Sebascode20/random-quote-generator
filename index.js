const d = document,
  $card = d.getElementById("quote-card"),
  $author = d.getElementById("author"),
  $quote = d.getElementById("quote");

const getQuote = async () => {
  try {
    let res = await fetch(
        "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json",
      ),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    const randomQuote = json[Math.floor(Math.random() * json.length)];

    for (const tag of randomQuote.tags) {
      const $span = d.createElement("span");
      $span.textContent = tag;
      $author.insertAdjacentElement("afterend", $span);
    }

    $author.textContent = randomQuote.author;
    $quote.textContent = randomQuote.quote;
  } catch (err) {
    let message = err.statusText || "An error ocurred";

    $card.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</b></p>`,
    );
  }
};

d.addEventListener("DOMContentLoaded", getQuote);

d.addEventListener("click", (e) => {
  if (e.target.matches("#btn-random")) {
    getQuote();
  }
});
