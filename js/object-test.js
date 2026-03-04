// 1) A simple object (like a product from the API)
const movie = {
  title: "Interstellar",
  year: 2014,
  director: "Christopher Nolan",
  rating: 8.6,
};

// 2) Console test
console.log("Movie object:", movie);
console.log("Movie title:", movie.title);

// 3) Safe DOM output (ONLY inside #movie-output)
const output = document.querySelector("#movie-output");

output.innerHTML = `
  <div style="background:#fff; padding:16px; border-radius:12px; box-shadow:0 10px 22px rgba(0,0,0,.06); max-width:420px;">
    <h3 style="margin-bottom:10px; font-weight:900; font-style:italic;">${movie.title}</h3>
    <p style="margin-bottom:6px; font-style:italic;">Year: ${movie.year}</p>
    <p style="margin-bottom:6px; font-style:italic;">Director: ${movie.director}</p>
    <p style="font-style:italic;">Rating: ${movie.rating}</p>
  </div>
`;
