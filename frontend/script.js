const eventsListDiv = document.getElementById("events-list")
const eventDetailDiv = document.getElementById("event-detail")
const eventTeamsSpan = document.getElementById("event-teams")
const betValueInput = document.getElementById("bet-value")
const possibleReturnSpan = document.getElementById("possible-return")
const backBtn = document.getElementById("back-btn")
const teamAspan = document.getElementById("teamA-span")
const teamBspan = document.getElementById("teamB-span")
const addToCartBtn = document.getElementById("add-to-cart-btn")


let currentEvent = null
let selectedResultKey = null
let selectedOdd = 0
const cart = []

async function loadEvents() {
    const res = await fetch("http://localhost:3333/events")
    const events = await res.json()

    eventsListDiv.innerHTML = ""
    events.forEach(ev => {
        const btn = document.createElement("button")
        btn.textContent = `${ev.teams[0]} x ${ev.teams[1]}`
        btn.onclick = () => showEventDetail(ev)
        eventsListDiv.append(btn)
    })
}

function showEventDetail(event) {
    currentEvent = event
    selectedResultKey = null
    selectedOdd = 0
    eventTeamsSpan.textContent = `${event.teams[0]} x ${event.teams[1]}`
    possibleReturnSpan.textContent = "0.00"
    teamAspan.textContent = `${event.teams[0]}`
    teamBspan.textContent = `${event.teams[1]}`
    addToCartBtn.disabled = true

    document.querySelectorAll("#event-detail button[data-result]").forEach(b => b.classList.remove("active"));

    eventsListDiv.style.display = "none"
    eventDetailDiv.style.display = "block"
}

function calculateReturn(odd) {
    const bet = parseFloat(betValueInput.value)
    
    if(isNaN(bet) || bet <= 0) {
        possibleReturnSpan.textContent = "0.00"
        return
    }
    
    let oddNumber
    if (typeof odd === "string") {
        oddNumber = parseFloat(odd.replace(",", "."))
    } else {
        oddNumber = odd
    }

    const total = bet * oddNumber
    possibleReturnSpan.textContent = total.toFixed(2)
}

function addToCart(event, resultKey, betValue, odd) {
    cart.push({
        eventId: event.id,
        teams: event.teams,
        resultKey,
        betValue,
        odd
    })
    renderCart()
}

function renderCart() {
    let cartDiv = document.getElementById("cart")
    if (!cartDiv) {
        cartDiv = document.createElement("div")
        cartDiv.id = "cart"
        cartDiv.style.marginTop = "30px"
        document.querySelector(".container").appendChild(cartDiv)
    }

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>O carrinho está vazio.</p>"
        return
    }

    let html = "<h3>Carrinho de Apostas</h3><ul style='padding-left: 20px; margin: 0;'>"
    let totalReturn = 0

    cart.forEach((item, index) => {
        const possibleReturn = item.betValue * item.odd
        totalReturn += possibleReturn
        const resultText = {
            winA: `Vitória do ${item.teams[0]}`,
            winB: `Vitória do ${item.teams[1]}`,
            draw: "Empate"
        }[item.resultKey]

        html += `
        <li style="margin-bottom: 15px; padding: 10px; border-radius: 8px; background: #28a745; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: white;">
                ${item.teams[0]} x ${item.teams[1]}
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 14px; color: white;">
                <span>${resultText}</span>
                <span>Aposta R$${item.betValue.toFixed(2)}</span>
                <span>Retorno R$${possibleReturn.toFixed(2)}</span>
            </div>
            <button onclick="removeFromCart(${index})" style="margin-top: 10px; background-color: #ff4d4d; border: none; color: white; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-size: 13px; font-weight: 600; transition: background-color 0.3s ease;">
                Remover
            </button>
        </li>
      `
    })

    html += `
    </ul>
        <p style="margin-top: 10px; font-weight: 700; font-size: 18px; color: white; text-align: right;">
            Retorno total estimado
            R$${totalReturn.toFixed(2)}
        </p>
    `;

    cartDiv.innerHTML = html
}

function removeFromCart(index) {
    cart.splice(index, 1)
    renderCart()
}

document.querySelectorAll("#event-detail button[data-result]").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#event-detail button[data-result]").forEach(b => b.classList.remove("active"))

        btn.classList.add("active")

        selectedResultKey = btn.getAttribute("data-result")
        const oddStr = currentEvent.odds[selectedResultKey]
        selectedOdd = parseFloat(oddStr.replace(",", "."))

        calculateReturn(selectedOdd)

        const bet = parseFloat(betValueInput.value)
        addToCartBtn.disabled = isNaN(bet) || bet <= 0 ? true : false
    })
})

betValueInput.addEventListener("input", () => {
    const bet = parseFloat(betValueInput.value)
    if (selectedOdd > 0 && bet > 0) {
        calculateReturn(selectedOdd)
        addToCartBtn.disabled = false
    } else {
        possibleReturnSpan.textContent = "0.00"
        addToCartBtn.disabled = true
    }
})

addToCartBtn.addEventListener("click", () => {
    const bet = parseFloat(betValueInput.value)

    if (!selectedResultKey) {
        alert("Selecione um resultado para apostar.")
        return
    }
    if (isNaN(bet) || bet <= 0) {
        alert("Informe um valor válido para a aposta.")
        return
    }

    addToCart(currentEvent, selectedResultKey, bet, selectedOdd)
    alert("Aposta adicionada ao carrinho!")

    selectedResultKey = null
    selectedOdd = 0
    possibleReturnSpan.textContent = "0.00"
    betValueInput.value = 0
    addToCartBtn.disabled = true

    document.querySelectorAll("#event-detail button[data-result]").forEach(b => b.classList.remove("active"))
})

backBtn.addEventListener("click", () => {
    eventDetailDiv.style.display = "none"
    eventsListDiv.style.display = "block"
})

loadEvents()