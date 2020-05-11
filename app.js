const app = document.getElementById("app");
const api = "https://acme-users-api-rev.herokuapp.com/api/users/search";
const container = document.createElement("table");
container.classList.add("container");

const renderPage = () => {
  const header = document.createElement("h1");
  header.classList.add("header");
  header.innerText = "Acme Users Search";
  header.classList.add("searchterm");

  const form = document.createElement("form");
  const input = document.createElement("input");
  const clear = document.createElement("a");
  clear.setAttribute("href", "url");
  clear.innerText = "clear";
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Type Search Term Here");
  input.setAttribute("id", "searchterm");
  form.append(input, clear);
  app.append(header, form);

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    fetchData();
  });

  form.addEventListener("click", (ev) => {
    ev.preventDefault();
    searchterm.value = "";
  });
};

const renderUsers = (users) => {
  const userInfo = users
    .map(
      (user) => `
    <tr class = 'user'>
    <td><img src = '${user.avatar}'></td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.title}</td>
      </tr>`
    )
    .join("");

  html = `<tr id = 'table-header'>
        <th></th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Title</th>
        </tr>
      ${userInfo}`;

  container.innerHTML = html;
  app.append(container);
};

const fetchData = () => {
  const searchTerm = searchterm.value || "Glo";
  fetch(
    `https://acme-users-api-rev.herokuapp.com/api/users/search/${searchTerm}`
  )
    .then((response) => response.json())
    .then((data) => {
      return renderUsers(data.users);
    });
};

renderPage();
fetchData();
