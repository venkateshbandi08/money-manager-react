import './index.css'

const MoneyDetails = props => {
  const {eachTabDetails, updatedAmountDetails} = props
  const {optionId, displayText, imgUrl, alt, style, dataTestId} = eachTabDetails
  const {incomeAmount, expenseAmount} = updatedAmountDetails

  function getUpdatedAmount() {
    if (optionId === 'INCOME') {
      return incomeAmount
    }
    return expenseAmount
  }

  return (
    <li className={style}>
      <img src={imgUrl} alt={alt} className="tab-image" />
      <div className="tab-content-container">
        <p className="balance-text">Your {displayText}</p>
        <p className="amount-text" data-testid={dataTestId}>
          Rs {getUpdatedAmount()}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
