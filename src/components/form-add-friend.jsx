import { useState } from "react"

const FormAddFriend = ({ onShowFormAddFriend, onSubmitAddFriend, setDocTitle }) => {
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

  return <div>
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>🧍‍♂️ Nome
        <input type="text" value={nameFriend} onChange={handleChangeNameFriend} placeholder="adicione um amigo ..." />
      </label>
      <label >📷 Foto
        <input type="text" value={photoFriend} onChange={handleChangePhotoFriend} placeholder="selecione uma foto ..." />
      </label>
      <button className="button">Adicionar</button>
    </form>
  </div>

}

export { FormAddFriend }
