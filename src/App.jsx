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

const ListFriends = ({ friends, selectedFriend, onChangeClickFriend }) => <ul>
  {friends.map((friend) => {
    const { message, color } = getMsgInfo(friend.balance)
    const isSelectedFriend = friend.id === selectedFriend?.id

    return (
      <li key={friend.id}>
        <img src={friend.img} alt={`Foto de ${friend.name}`} />
        <h3>{friend.name}</h3>
        <p className={color}>{message}</p>
        <button
          onClick={() => onChangeClickFriend(friend)}
          className={`button ${isSelectedFriend ? 'button-close' : ''}`}
        >
          {isSelectedFriend ? 'Fechar' : 'Selecionar'}
        </button>
      </li>
    )
  })}
</ul>

const FormAddFriend = ({ onShowFormAddFriend, onSubmitAddFriend }) => {
  const [nameFriend, setNameFriend] = useState('')
  const [photoFriend, setPhotoFriend] = useState('')

  const handleChangeNameFriend = e => setNameFriend(e.target.value)
  const handleChangePhotoFriend = e => setPhotoFriend(e.target.value)


  const handleSubmit = (e) => {
    e.preventDefault()

    if (nameFriend === '' || photoFriend === '') {
      return
    }

    const newFriend = {
      name: nameFriend,
      img: photoFriend,
      balance: 0,
      id: crypto.randomUUID()
    }

    onSubmitAddFriend(newFriend)
    setPhotoFriend('')
    setNameFriend('')
  }

  return onShowFormAddFriend &&
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>🧍‍♂️ Nome
        <input type="text" value={nameFriend} onChange={handleChangeNameFriend} placeholder="adicione um amigo ..." />
      </label>
      <label >📷 Foto
        <input type="text" value={photoFriend} onChange={handleChangePhotoFriend} placeholder="selecione uma foto ..." />
      </label>
      <button className="button">Adicionar</button>
    </form>
  }

const ShowFormAddFriend = ({ onClickAddFriend, addNewFriend }) =>
  <button
    onClick={onClickAddFriend}
    className={`button ${addNewFriend ? 'button-close' : ''}`}
  >
    {addNewFriend ? 'Fechar' : 'Adicionar amigo(a)'}
  </button>

const FormSplitBill = ({ selectedFriend, onSubmitShareBill }) => {
  const [totalBill, setTotalBill] = useState('')
  const [mySpend, setMySpend] = useState('')
  const [whoWillPay, setWhoWillPay] = useState('you')

  const handleChangeBill = e => setTotalBill(e.target.value)
  const handleChangeMySpend = e => setMySpend(e.target.value)
  const handleChangeWhoWillPay = e => setWhoWillPay(e.target.value)

  const handleSubmitShareBill = e => {
    e.preventDefault()
   
    onSubmitShareBill({
      ...selectedFriend,
      balance: whoWillPay === 'you'
        ? selectedFriend.balance + (+totalBill - +mySpend)
        : selectedFriend.balance - +mySpend
    })
    setTotalBill('')
    setMySpend('')
    setWhoWillPay('you')
  }
  
  return selectedFriend &&
  <form onSubmit={handleSubmitShareBill} className="form-split-bill">
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
  </form>

}

const Logo = () => {
  return <header className="header">
    <img src="./logo-racha-conta.png" alt="logo" />
  </header>
}

const App = () => {
  const [friends, setFriends] = useState(initialsFriends)
  const [addNewFriend, setAddNewFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null)
 
  const handleClickFriend = friend => setSelectedFriend(p => p?.id === friend.id ? null : friend)
  const handleClickAddFriend = () => setAddNewFriend(p => !p)
 
  const handleSubmitAddFriend = newFriend => {
    setFriends(prev => [...prev, newFriend])
    setAddNewFriend(false)
  }

  const handleSubmitShareBill = friend => {
    setFriends(prev => prev.map(p => friend.id === p.id ? friend : p))
    setSelectedFriend(null)
  }

  return <>
    <Logo />
    <main className="app ">
      <aside className="sidebar">
        <ListFriends
          friends={friends}
          selectedFriend={selectedFriend}
          onChangeClickFriend={handleClickFriend}
        />
        <FormAddFriend
          onSubmitAddFriend={handleSubmitAddFriend}
          onShowFormAddFriend={addNewFriend}
        />

        <ShowFormAddFriend
          onClickAddFriend={handleClickAddFriend}
          addNewFriend={addNewFriend}
        />
      </aside>
      <FormSplitBill 
        onSubmitShareBill={handleSubmitShareBill} 
        selectedFriend={selectedFriend} 
      />
    </main>
  </>
}

export { App }
