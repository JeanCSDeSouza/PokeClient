import React from "react";
import {Link} from "react-router-dom";
export function PokeCard({ id, name, description, imgSrc, onDetails }) {
    return (
        <article className="property-3 property">
            <div className="card-image-topcard-image">
                <div className="card-image">
                    <img className="img-placeholder" src={imgSrc} alt={name} />
                </div>
                <div className="card-content">
                    <div className="stack">
                        <div className="address inter-semi-bold-shark-14px">{`#${id} ${name}`}</div>
                        <p className="lorem-ipsum-dolor-si inter-normal-nevada-11px">
                            {description}
                        </p>
                        <Link to={`/details/${id}`}>
                            <div className="details">
                                <div className="details_01 inter-semi-bold-white-11px">detalhes</div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </article>
    );
}