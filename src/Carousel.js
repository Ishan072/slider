import { useEffect, useState } from "react";
import {longList} from "./data";
import {FaQuoteRight} from "react-icons/fa";
import {FiChevronRight,FiChevronLeft} from "react-icons/fi";

const Carousel = () => {

    const people = longList;
    const [currentPerson,setCurrentPerson] = useState(0);

    const prevSlide = () => {
        setCurrentPerson((oldperson)=>{
            const result = (oldperson - 1 + people.length) % people.length;
            return result;
        })
    }

    const nextSlide = () => {
        setCurrentPerson((oldperson)=>{
            const result = (oldperson + 1) % people.length;
            return result;
        })
    }

    useEffect(()=>{
        let sliderID = setInterval(()=>{
            return nextSlide();
        },4000)

        return (
            ()=>{
                clearInterval(sliderID);
            }
        );

    },[currentPerson]);

    return (
        <section className="slider-container">
            {people.map((person,personIndex)=>{
                const {id,image,name,title,quote} = person;
                return (<article key={id} className="slide" style={{transform:`translateX(${100*(personIndex-currentPerson)}%)`,
                opacity:currentPerson===personIndex?1:0,
                visibility:currentPerson===personIndex?"visible":"hidden"}}>
                    <img src={image} alt={name} className="person-img" />
                    <h5 className="name">{name}</h5>
                    <p className="title">{title}</p>
                    <p className="text">{quote}</p>
                    <FaQuoteRight className="icon"/>
                </article>);
            })}
            <button className="prev" onClick={prevSlide}>
                <FiChevronLeft />
            </button>

            <button className="next" onClick={nextSlide}>
                <FiChevronRight />
            </button>
        </section>
    );
}

export default Carousel;