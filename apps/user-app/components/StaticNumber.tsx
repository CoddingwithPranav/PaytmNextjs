

export default 

function StaticNumber({ number, suffix = "", className = "" }:any) {
  return (
    <span className={className}>
      {number}
      {suffix}
    </span>
  )
}
