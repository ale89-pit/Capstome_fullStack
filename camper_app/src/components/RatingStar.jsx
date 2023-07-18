import { CDBRating, CDBContainer } from 'cdbreact';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { myHeadersToken } from '../redux/actions/userAction';

const RatingStar = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const params = useParams()

    const API_URL_EVALUATION = `http://localhost:8080/app/facilities/vote?facilityId=${params.id}&vote=${rating}`

    const sendValutation = async () => {

        try {
            let response = await fetch(API_URL_EVALUATION, {
                method: "POST",
                headers: myHeadersToken,
                redirect: "follow"
            })
            if (response.ok) {
                alert("valutazione inviata")
                setRating(null);
            } else {
                alert("errore")
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        if (rating != null) {

            sendValutation(rating)
            console.log(rating)
        }
    }, [rating])
    return (

        <div>
            {[...Array(5)].map((star, i) => {
                const currentRating = i + 1
                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}

                            onClick={() => {
                                setRating(currentRating)
                            }}
                        />
                        <FaStar
                            className='star'
                            size={20}
                            color={currentRating <= (hover || rating) ? '#f8e825' : '#aaa'}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />



                    </label>
                )
            })}

            {/* <input className='btn btn-primary' ="vota" type="button" onClick={sendValutation} /> */}
        </div>
    );

};

export default RatingStar;