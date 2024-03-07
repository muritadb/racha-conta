import { useState } from "react"

const initialsFriends = [
  {
    img: './friends/alessandra-48.jpg',
    name: 'joao',
    balance: 0,
    id: crypto.randomUUID()
  },
  {
    img: './friends/antonio-48.jpg',
    name: 'jose',
    balance: 0,
    id: crypto.randomUUID()
  },
  {
    img: './friends/renata-48.jpg',
    name: 'maria',
    balance: 0,
    id: crypto.randomUUID()
  },
]

const getMsgInfo = balance => balance < 0
  ? { message: `Você deve ${Math.abs(balance)} reais`, color: 'red-debit' }
  : balance > 0
    ? { message: `Te deve ${balance} reais`, color: 'green-credit' }
    : { message: 'Estão quites', color: 'white-neutral' }

const App = () => {
  const [friends, setFriends] = useState(initialsFriends)
  const [addNewFriend, setAddNewFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [totalBill, setTotalBill] = useState('')
  const [mySpend, setMySpend] = useState('')
  const [whoWillPay, setWhoWillPay] = useState('you')

  const [nameFriend, setNameFriend] = useState('')
  const [photoFriend, setPhotoFriend] = useState('')

  const handleClickFriend = friend => setSelectedFriend(p => p?.id === friend.id ? null : friend)
  const handleChangeBill = e => setTotalBill(e.target.value)
  const handleChangeMySpend = e => setMySpend(e.target.value)
  const handleChangeWhoWillPay = e => setWhoWillPay(e.target.value)

  const handleClickAddFriend = () => setAddNewFriend(p => !p)
  const handleSubmitShareBill = e => {
    e.preventDefault()

    setFriends(prev => prev.map(friend => selectedFriend.id === friend.id
      ? {
        ...friend,
        balance: whoWillPay === 'you'
          ? friend.balance + (+totalBill - +mySpend)
          : friend.balance - +mySpend
      }
      : friend
    ))


    setSelectedFriend(null)
    setTotalBill('')
    setMySpend('')
    setWhoWillPay('you')
  }

  const handleSubmitFriend = (e) => {
    e.preventDefault()


    setFriends(prev =>
      [
        ...prev,
        {
          img: photoFriend,
          name: nameFriend,
          balance: 0,
          id: crypto.randomUUID()
        }
      ]
    )

    setPhotoFriend('')
    setNameFriend('')
    setAddNewFriend(null)
  }

  const handleChangeNameFriend = (e) => setNameFriend(e.target.value)
  const handleChangePhotoFriend = (e) => setPhotoFriend(e.target.value)

  return < div >
    <header className="header">
      <img src="./logo-racha-conta.png" alt="logo" />
    </header>
    <main className="app ">
      <aside className="sidebar">
        <ul>
          {friends.map((friend) => {
            const { message, color } = getMsgInfo(friend.balance)
            const isSelectedFriend = friend.id === selectedFriend?.id

            return (
              <li key={friend.id}>
                <img src={friend.img} alt={`Foto de ${friend.name}`} />
                <h3>{friend.name}</h3>
                <p className={color}>{message}</p>
                <button
                  onClick={() => handleClickFriend(friend)}
                  className={`button ${isSelectedFriend ? 'button-close' : ''}`}
                >
                  {isSelectedFriend ? 'Fechar' : 'Selecionar'}
                </button>
              </li>
            )
          })}
        </ul>
        {addNewFriend && <form onSubmit={handleSubmitFriend} className="form-add-friend">
          <label>🧍‍♂️ Nome
            <input type="text" value={nameFriend} onChange={handleChangeNameFriend} placeholder="adicione um amigo ..." />
          </label>
          <label >📷 Foto
            <input type="text" value={photoFriend} onChange={handleChangePhotoFriend} placeholder="selecione uma foto ..." />
          </label>
          <button className="button">Adicionar</button>
        </form>
        }
        <button
          onClick={handleClickAddFriend}
          className={`button ${addNewFriend ? 'button-close' : ''}`}
        >
          {addNewFriend ? 'Fechar' : 'Adicionar amigo(a)'}
        </button>
      </aside>

      {selectedFriend && <form onSubmit={handleSubmitShareBill} className="form-split-bill">
        <h2>Rache a conta com {selectedFriend.name}</h2>
        <label >💰 Valor Total
          <input value={totalBill} onChange={handleChangeBill} type="number" />
        </label>
        <label>🤸‍♂️ Seus gastos
          <input value={mySpend} onChange={handleChangeMySpend} type="number" />
        </label>
        <label>🤑 Quem vai pagar
          <select value={whoWillPay} onChange={handleChangeWhoWillPay}>
            <option value='you'>Você</option>
            <option value={selectedFriend.name}>{selectedFriend.name}</option>
          </select>
        </label>
        <button className="button">Rachar Conta</button>
      </form>}
    </main>
  </div >
}

export { App }
