// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


struct MovieStruct {
    uint256 movieIndex;
    string title;
    uint256 rating;
    uint256 totalSeats;
}

struct SeatStruct{
    uint256 movieId;
    uint256 seatIndex;
}

contract MovieTicketing {
    uint256 private movieCounter;
    address private owner =0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    
    event MovieAdded(uint256 _movieIndex,string title, uint256 rating,uint256 totalSeats);
    event SeatBooked(address owner, uint256[] seatIndex,uint256 movieId );
    

    MovieStruct[] public movies;
    mapping (address => SeatStruct[]) public clientSeats;
    mapping(uint256 => uint256[]) public movieToBookedSeats;

    function addMovie(string memory _title,uint256 _rating,uint256 _totalSeats) public {
        require(msg.sender==owner,"You don't  have  privilage  to Add movie");
        MovieStruct memory newMovie;

        newMovie.movieIndex =movieCounter;
        newMovie.title=_title;
        newMovie.rating =_rating;
        newMovie.totalSeats=_totalSeats;

        movies.push(newMovie);

        movieToBookedSeats[movieCounter];
        emit MovieAdded(movieCounter,_title,_rating, _totalSeats);
        movieCounter++;
    }

    function checkIsSeatBooked(uint256 _movieIndex,uint256[] memory _seatIndex)private view returns(bool){
        uint256[] memory  bookedSeats = movieToBookedSeats[_movieIndex];
        for(uint256 j=0;j<_seatIndex.length;j++){
        for(uint256 i=0;i<bookedSeats.length;i++){
            if(bookedSeats[i]== _seatIndex[j]){
                return false;
            }
        }
        }
        return true;
        
    }

    function bookSeat(uint256 _movieIndex,uint256[] memory _seatIndex,address _owner) public {
    bool isSeatAvailable;
    isSeatAvailable=checkIsSeatBooked(_movieIndex,_seatIndex);
    require(isSeatAvailable,"Seat already booked");
    
    for(uint256 i=0;i<_seatIndex.length;i++){        
        SeatStruct memory seat;
        seat.movieId=_movieIndex;
        seat.seatIndex=_seatIndex[i];

        clientSeats[_owner].push(seat);
        movieToBookedSeats[_movieIndex].push(_seatIndex[i]);
    }
    emit SeatBooked(_owner,_seatIndex,_movieIndex);
    }

    function getSeatsByMovieId(uint256 _movieId)public view returns(uint256[] memory) {
        return movieToBookedSeats[_movieId];
    }

    function getSeatsByClientId()public view returns(SeatStruct[] memory) {
        return clientSeats[msg.sender];
    }

    function getAllMovies() public view returns (MovieStruct [] memory) {
        return movies;
    }

    function getAllMoviesCount() public view returns(uint256){
        return movies.length;
        }
}