// 4 function
//get games, get game, add game, delete game


export default function GamesFunction() {
    let [games, setGames] = useState([]);
  
    useEffect(() => {
      /**
       * Using .then/.catch in useEffect()
       **/
  
      fetch('/games')
          .then(result => result.json())
          .then(games => {
              setCats(games);
          })
          .catch(err => {
              console.log(`Error: ${err.message}`);
          });
    }, []);
  
    function addGame(name, universe, date) {
      let newGame = { name, universe, date };
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame)
      };
  
      fetch("/games", options)
        .then(result => result.json())
        .then(games => {
          setCats(games);
        })
        .catch(err => {
          console.log("error!", err.message);
        });
    }
  
    // function deleteCat(id) {
    //   let options = {
    //     method: "DELETE"
    //   };
  
    //   fetch(`/api/cats/${id}`, options)
    //   .then(result => result.json())
    //   .then(cats => {
    //     setCats(cats);
    //   })
    //   .catch(err => {
    //     console.log("error!", err.message);
    //   });
    // }
  
    return (
      <div className="App">
     
      </div>
    );
  }
  

  //export default GamesFunction;
