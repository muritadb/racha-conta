const ShowFormAddFriend = ({ onClickAddFriend, addNewFriend }) =>
  <button
    onClick={onClickAddFriend}
    className={`button ${addNewFriend ? 'button-close' : ''}`}
  >
    {addNewFriend ? 'Fechar' : 'Adicionar amigo(a)'}
  </button>


export { ShowFormAddFriend }