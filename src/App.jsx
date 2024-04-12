import { useState } from "react"
import { Logo } from './components/logo'
import { FormAddFriend } from './components/form-add-friend'
import { FormSplitBill } from './components/form-split-bill'
import { ListFriends } from './components/list-friend'
import { ShowFormAddFriend } from './components/show-form-add-friend'

const App = () => {
  const [friends, setFriends] = useState([])
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
        {addNewFriend && <FormAddFriend
          onSubmitAddFriend={handleSubmitAddFriend}
          onShowFormAddFriend={addNewFriend}
        />}

        <ShowFormAddFriend
          onClickAddFriend={handleClickAddFriend}
          addNewFriend={addNewFriend}
        />
      </aside>
      {selectedFriend && <FormSplitBill
        onSubmitShareBill={handleSubmitShareBill}
        selectedFriend={selectedFriend}
      />}
    </main>
  </>
}

export { App }
