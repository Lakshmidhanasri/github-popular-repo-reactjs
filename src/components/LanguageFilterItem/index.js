// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersDetails, setActiveLanguageId, isActive} = props
  const {language, id} = languageFiltersDetails
  const btnClassName = isActive ? 'button active-button' : 'button'
  const onClicklanguage = () => {
    setActiveLanguageId(id)
  }

  return (
    <li className="list">
      <button className={btnClassName} type="button" onClick={onClicklanguage}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
