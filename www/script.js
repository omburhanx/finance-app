let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let savingTarget = localStorage.getItem("savingTarget") || 0;

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const balanceEl = document.getElementById("balance");
const transactionList = document.getElementById("transactionList");
const savingStatus = document.getElementById("savingStatus");

function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

function addTransaction() {
  const type = document.getElementById("type").value;
  const desc = document.getElementById("description").value;
  const amount = Number(document.getElementById("amount").value);

  if (!desc || amount <= 0) {
    alert("Lengkapi data!");
    return;
  }

  transactions.push({
    type,
    desc,
    amount,
    date: new Date().toLocaleDateString("id-ID")
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";

  render();
}

function render() {
  transactionList.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((t, i) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;

    const li = document.createElement("li");
    li.className = t.type;
    li.innerHTML = `
      <span>${t.desc}<br><small>${t.date}</small></span>
      <strong>${formatRupiah(t.amount)}</strong>
    `;
    transactionList.appendChild(li);
  });

  const balance = income - expense;

  totalIncomeEl.innerText = formatRupiah(income);
  totalExpenseEl.innerText = formatRupiah(expense);
  balanceEl.innerText = formatRupiah(balance);

  updateSaving(balance);
}

function saveTarget() {
  savingTarget = Number(document.getElementById("savingTarget").value);
  localStorage.setItem("savingTarget", savingTarget);
  render();
}

function updateSaving(balance) {
  if (savingTarget > 0) {
    savingStatus.innerText = 
      `Tabungan: ${formatRupiah(balance)} / ${formatRupiah(savingTarget)}`;
  }
}

function clearAll() {
  if (confirm("Hapus semua data?")) {
    transactions = [];
    localStorage.clear();
    render();
  }
}

render();
