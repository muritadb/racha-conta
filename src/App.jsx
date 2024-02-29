import { useState } from "react"

const friends = [
  {
    img: './friends/alessandra-48.jpg',
    name: 'joao',
    status: 'deve',
    id: crypto.randomUUID()
  },
  {
    img: './friends/antonio-48.jpg',
    name: 'jose',
    status: 'paga',
    id: crypto.randomUUID()
  },
  {
    img: './friends/renata-48.jpg',
    name: 'maria',
    status: 'nada',
    id: crypto.randomUUID()
  },
]

const App = () => {
  const [formAddFriend, setFormAddFriend] = useState(false)
  const [formPayBill, setFormPayBill] = useState(false)

  const isAddFriend = (id) => {
    const friendSelected = friends.filter(friend => friend.id === id)
    return friendSelected ? setFormAddFriend(!formAddFriend) : formAddFriend

  }


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
      <ul className="sidebar">
        {friends.map(({ id, name, status, img }) => (
          <li
            key={id}
          >
            <img src={img} alt="logo" />
            <h3>{name}</h3>
            <p>{status}</p>
            <button
              className={!formAddFriend ? "button" : "button button-close"}
              onClick={() => isAddFriend(id)}
            >
              {!formAddFriend ? 'Selecionar' : 'Fechar'}
            </button>
          </li>
        ))}

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
      {formAddFriend &&
        <form className="form-split-bill">
          <h2>Rache a conta com Antonio</h2>
          <label >💰 Valor Total
            <input type="text" />
          </label>
          <label>🤸‍♂️ Seus gastos
            <input type="text" />
          </label>
          <label>🤑 Quem vai pagar
            <select name="">
              <option >Você</option>
              <option >Antonio</option>
            </select>
          </label>
          <button className="button">Rachar Conta</button>
        </form>}
    </main>
  </div >
}

export { App }
