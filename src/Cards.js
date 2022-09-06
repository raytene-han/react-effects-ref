
/** Cards component.
 *
 * Props:
 * - list of cards that have been drawn
 *
 */
function Cards({ cards }) {

  return (
    <div>
      {cards.map(c => <img src={c.image} alt={c.code} key={c.image} />)}
    </div>
  )
}

export default Cards;