import SearchIcon from '@mui/icons-material/Search';
import '../Search-Bar/Form.css'
const Form = () => {

    return ( 
            <form className="search__form" >
                <input type="text"  placeholder='Search for products' className="search__form__input" required/>
                <button className="search__form__button" type='submit'>
                    <SearchIcon fontSize='medium'/>
                </button>
            </form>
     );
}
 
export default Form;