import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    alt: 'income',
    style: 'income-tab-container',
    dataTestId: 'incomeAmount',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    alt: 'expenses',
    style: 'expenses-tab-container',
    dataTestId: 'expensesAmount',
  },
]

// Write your code here

// incomeAmountUpdated={totalIncomeAmount}
// expenseAmountUpdated={totalExpenseAmount}

const initialTransactionsList = []

class MoneyManager extends Component {
  state = {
    transactionsList: initialTransactionsList,
    title: '',
    amountEntered: '',
    type: 'INCOME',
    balanceAmount: 0,
    incomeAmount: 0,
    expenseAmount: 0,
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amountEntered, type} = this.state
    const newTransactionItem = {
      id: uuidv4(),
      title,
      amountEntered,
      type,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransactionItem],
      title: '',
      amountEntered: '',
    }))
    if (newTransactionItem.type === 'INCOME') {
      this.setState(prevState => ({
        balanceAmount:
          parseInt(prevState.balanceAmount) +
          parseInt(newTransactionItem.amountEntered),
        incomeAmount:
          parseInt(prevState.incomeAmount) +
          parseInt(newTransactionItem.amountEntered),
      }))
    } else if (newTransactionItem.type === 'EXPENSES') {
      this.setState(prevState => ({
        balanceAmount:
          parseInt(prevState.balanceAmount) -
          parseInt(newTransactionItem.amountEntered),
        expenseAmount:
          parseInt(prevState.expenseAmount) +
          parseInt(newTransactionItem.amountEntered),
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeAmountEntered = event => {
    this.setState({
      amountEntered: event.target.value,
    })
  }

  onChangeType = event => {
    this.setState({
      type: event.target.value,
    })
  }

  onDeleteSingleTransaction = transactionDetails => {
    this.setState(prevState => ({
      transactionsList: prevState.transactionsList.filter(
        eachTransaction => eachTransaction.id !== transactionDetails.id,
      ),
    }))
    if (transactionDetails.type === 'INCOME') {
      this.setState(prevState => ({
        balanceAmount:
          parseInt(prevState.balanceAmount) -
          parseInt(transactionDetails.amountEntered),
        incomeAmount:
          parseInt(prevState.incomeAmount) -
          parseInt(transactionDetails.amountEntered),
      }))
    } else if (transactionDetails.type === 'EXPENSES') {
      this.setState(prevState => ({
        balanceAmount:
          parseInt(prevState.balanceAmount) +
          parseInt(transactionDetails.amountEntered),
        expenseAmount:
          parseInt(prevState.expenseAmount) -
          parseInt(transactionDetails.amountEntered),
      }))
    }
  }

  render() {
    const {
      title,
      amountEntered,
      type,
      transactionsList,
      balanceAmount,
      incomeAmount,
      expenseAmount,
    } = this.state
    const updatedAmounts = {
      incomeAmount,
      expenseAmount,
    }
    return (
      <div className="bg-container">
        <div className="money-manager-app-container">
          <div className="profile-section-container">
            <h1 className="user-name"> Hi, Poojitha </h1>
            <p className="welcome-text">
              Welcome back to your
              <span className="money-manager-span-element"> Money Manager</span>
            </p>
          </div>
          <div className="money-managing-tabs-container">
            <ul className="balance-income-expense-tabs-container">
              <li className="balance-tab-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                  alt="balance"
                  className="tab-image"
                />
                <div className="tab-content-container">
                  <p className="balance-text">Your Balance</p>
                  <p className="amount-text" data-testid="balanceAmount">
                    Rs {balanceAmount}
                  </p>
                </div>
              </li>
              {transactionTypeOptions.map(eachTabItem => (
                <MoneyDetails
                  eachTabDetails={eachTabItem}
                  key={eachTabItem.optionId}
                  updatedAmountDetails={updatedAmounts}
                />
              ))}
            </ul>
            <div className="bottom-section-container">
              <div className="add-transaction-and-history-container">
                <form className="add-transaction-container">
                  <h1 className="add-transaction-text"> Add Transaction </h1>
                  <div className="input-title-container">
                    <label htmlFor="title" className="label-element">
                      TITLE
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="input-title"
                      placeholder="TITLE"
                      onChange={this.onChangeTitle}
                      value={title}
                    />
                  </div>
                  <div className="input-title-container">
                    <label htmlFor="amount" className="label-element">
                      AMOUNT
                    </label>
                    <input
                      type="text"
                      id="amount"
                      className="input-title"
                      placeholder="AMOUNT"
                      onChange={this.onChangeAmountEntered}
                      value={amountEntered}
                    />
                  </div>
                  <div className="input-title-container">
                    <label htmlFor="type" className="label-element">
                      TYPE
                    </label>
                    <select
                      className="input-title"
                      id="type"
                      value={type}
                      onChange={this.onChangeType}
                    >
                      <option
                        value="INCOME"
                        className="option-element"
                        placeholder="TYPE"
                        selected
                      >
                        Income
                      </option>
                      <option value="EXPENSES" className="option-element">
                        Expenses
                      </option>
                    </select>
                  </div>
                  <button
                    className="add-button"
                    type="submit"
                    onClick={this.onAddTransaction}
                  >
                    Add
                  </button>
                </form>
                <div className="history-container">
                  <h1 className="history-text"> History </h1>
                  <ul>
                    <li className="history-details-container">
                      <p className="history-attribute">Title</p>
                      <p className="history-attribute">Amount</p>
                      <p className="history-attribute">Type</p>
                    </li>
                  </ul>
                  <ul className="history-detail-items-container">
                    {transactionsList.map(eachTransactionDetails => (
                      <TransactionItem
                        eachTransactionDetails={eachTransactionDetails}
                        onDeleteSingleTransaction={
                          this.onDeleteSingleTransaction
                        }
                        key={eachTransactionDetails.id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
