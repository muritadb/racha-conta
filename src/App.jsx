import { useState } from "react"

const friends = [
  {
    img: './friends/alessandra-48.jpg',
    name: 'joao',
    balance: 10,
    id: crypto.randomUUID()
  },
  {
    img: './friends/antonio-48.jpg',
    name: 'jose',
    balance: 7,
    id: crypto.randomUUID()
  },
  {
    img: './friends/renata-48.jpg',
    name: 'maria',
    balance: 70,
    id: crypto.randomUUID()
  },
]

const getMsgInfo = balance => balance < 0
  ? { message: `Você deve ${Math.abs(balance)} reais`, color: 'red-debit' }
  : balance > 0
    ? { message: `Te deve ${balance} reais`, color: 'green-credit' }
    : { message: 'Estão quites', color: 'white-neutral' }

const App = () => {
  const [formAddFriend, setFormAddFriend] = useState(false)
  const [formPayBill, setFormPayBill] = useState(false)

  // const isAddFriend = (id) => {
  //   const friendSelected = friends.filter(friend => friend.id === id)
  //   return friendSelected ? setFormAddFriend(!formAddFriend) : formAddFriend

  // }


  const isPayBill = () => setFormPayBill(!formPayBill)

  const addFriend = (e) => {
    e.preventDefault()

    console.log('adicionei rapaz')
  }

  return < div >
    <header className="header">
      <img src="./logo-racha-conta.png" alt="logo" />
    </header>
    <main className="app ">
      <aside className="sidebar">
        <ul>
          {friends.map((friend) => {
            const { message, color } = getMsgInfo(friend.balance)

            return (
              <li key={friend.id}>
                <img src={friend.img} alt={`Foto de ${friend.name}`} />
                <h3>{friend.name}</h3>
                <p className={color}>{message}</p>
                <button className="button">Selecionar</button>
              </li>
            )
          })}

          {formPayBill &&
            <form className="form-add-friend" onSubmit={addFriend}>
              <label>🧍 Nome
                <input type="text" placeholder="nome ..." />
              </label>
              <label>📷 Foto
                <input type="text" placeholder="..." />
              </label>
              <button className="button">Adicionar</button>
            </form>
          }

          <button onClick={isPayBill} className="button ">Adicionar amigo(a)</button>
        </ul>
      </aside>

      <form className="form-split-bill">
        <h2>Rache a conta com Antonio</h2>
        <label >💰 Valor Total
          <input type="number" />
        </label>
        <label>🤸‍♂️ Seus gastos
          <input type="text" />
        </label>
        <label>🤑 Quem vai pagar
          <select name="">
            <option value='you'>Você</option>
            <option value='nome'>Antonio</option>
          </select>
        </label>
        <button className="button">Rachar Conta</button>
      </form>
    </main>
  </div >
}

export { App }
