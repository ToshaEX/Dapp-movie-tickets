// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

struct MovieStruct {
    string title;
    uint256 totalSeats;
}

contract MovieTicketing {
    uint256 trasactionCounter;
    
    address public owner;

    event MovieAdded(string title, uint256 totalSeats);
    event transfer(address from,uint ammount,uint[] seats,uint256 timestamp,string keyword);

    MovieStruct[] public movies;

    function addMovie(string memory _title,uint256 _totalSeats) public {
        MovieStruct memory newMovie = MovieStruct({
            title:_title,
            totalSeats:_totalSeats
        });
        movies.push(newMovie);
        emit MovieAdded(_title, _totalSeats);
    }

    function getAllMovies() public view returns (MovieStruct [] memory) {
        return movies;
    }

    function getAllMoviesCount() public view returns(uint256){
        return movies.length;
        }
}