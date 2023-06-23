// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachTransactionDetails, onDeleteSingleTransaction} = props
  const {title, amountEntered, type} = eachTransactionDetails
  const onDeleteTransaction = () => {
    onDeleteSingleTransaction(eachTransactionDetails)
  }
  return (
    <li className="each-transaction-detail">
      <p className="history-attribute-transaction">{title}</p>
      <p className="history-attribute-transaction">{amountEntered}</p>
      <p className="history-attribute-transaction">{type}</p>
      <button
        className="delete-button"
        onClick={onDeleteTransaction}
        type="button"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
