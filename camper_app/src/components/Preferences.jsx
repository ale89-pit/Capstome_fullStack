import { useSelector } from "react-redux"
import SingleCardFacility from "./SingleCardFacility";

const Preferences = () => {

    const preferences = useSelector((state) => state.login.profile[0]?.preference) || null;

    return (
        <>

            {preferences && preferences.map((preference) => <SingleCardFacility key={preference.id} facProp={preference} />
            )}

        </>
    )
}


export default Preferences