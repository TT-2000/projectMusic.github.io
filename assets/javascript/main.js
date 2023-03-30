// Lỗi bài hát đầu tiên
// 


const apiSong =   "https://test-json-git-main-tt-2000.vercel.app/songs";
const apiAlbumHot = "https://test-json-tt-2000.vercel.app/albumhot";
const apiSingers = "https://test-json-nu.vercel.app/singer";


async function getAPI(API_SONG, API_ALBUM, API_SINGERS) {
  const resSong = await axios.get(API_SONG);
  const resAlbum = await axios.get(API_ALBUM);
  const resSingers = await axios.get(API_SINGERS);
  
  const dataSingers = resSingers.data;
  const dataAlbum = resAlbum.data;
  const dataSong = resSong.data;
  
  renderHTML(dataSong, dataAlbum, dataSingers);
  musicListeningTask(dataSong, dataAlbum);
}

getAPI(apiSong, apiAlbumHot, apiSingers);


function renderHTML(dataSong, dataAlbum, dataSinger) {

  function renderSongsTrending() {
    const songTrending = dataSong;
    
    const filter = songTrending.filter( element => {
      return element.render ==  1;
    })


    console.log(filter)
    const newList = filter.map( (element, index) => {
      return {
        id: index + 1,
        image: element.image,
        singer: element.singer,
        song: element.song,
        songName: element.songName

      }
    })

  
    const listTrending = document.querySelector(".column-1");

    
    const render = newList.map((element) => {
      return `
                  <div class="song-trending" id="${element.id}">
                  <div class="song">
                    <div class="contents-song">
                      <div class="image">
                            <div class="cover">
                            <i class="play fas fa-play"></i>
                        </div>
                        <img
                        src="${element.image}" alt="" srcset=""/>
                      </div>
                      <div class="info-song">
                        <div class="name-song">${element.songName}</div>
                        <div class="singers">
                        </div>
                        <a href="#" class="singer-name">${element.singer[0]}</a> <a href="#" class="singer-name">${element.singer[1] || ""}</a>  <a href="#" class="singer-name">${element.singer[2]|| ""}</a>
                      </div>
                    </div>
                    <div class="option">
                      <div class="icon">
                        <i class="three-dots fas fa-ellipsis-h"></i>
                        <div class="btn-options">
                          <div class="btn-point">
                            <div class="btn-icon like">
                              <i class="icon fa-regular fa-heart"></i>
                              <a   class="title">Yêu thích</a>
                            </div>
                            <div class="btn-icon download">
                              <i class="icon fas fa-cloud-download"></i>
                              <a href="" download  class="title">Tải xuống</a>
                            </div>
                            <div class="btn-icon share">
                              <i class="icon fas fa-share-square"></i>
                              <a  class="title">Chia sẻ</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
              `;
    });

    

    listTrending.innerHTML = render.join("");
  }

  async function renderAlbum() {
    const apiAlbumHot = "https://test-json-tt-2000.vercel.app/albumhot";
    const apiAlbumVN = "https://test-json-tt-2000.vercel.app/VuTruNhacViet";
    
    const resAlbumVN = await axios.get(apiAlbumVN);
    const resAlbumHot = await axios.get(apiAlbumHot);
    const albumhot  = resAlbumHot.data
    const VuTruNhacViet = resAlbumVN.data;

    const albumVN = document.querySelector(".album-hot_list-vn");

    const renderAlbumVN = VuTruNhacViet.map((element) => {
      return `

                    <div class="group-album-hot col l-2-4 l-2 c-2 m-3 c-3 sm-4">
                    <div class="album-hot_list-item">
                        <div class="album-hot_list-item-img">
                        <img src="${element.image}" alt="" srcset="">
                        </div>

                        <div class="icon">
                          <a href="index.html#ABVN${element.id}" id="${element.id}">
                            <i class="icons fas fa-play"></i>
                          </a>
                        </div>
                    </div>
                    <div class="album-hot_list-item-title">
                        <a href="#" class="">${element.name}</a>
                    </div>
                    </div>
                `;
    });

    albumVN.innerHTML = renderAlbumVN.join(" ");

    const albumHotList = document.querySelector(".album-hot_list");
    const renderAlbumHOT = albumhot.map((element) => {
      return `
            <div class="group-album-hot col l-1-4 l-2 c-2 m-3 c-3 sm-4" id="${element.id}">
            <a class="album-hot_list-item">
                <div class="album-hot_list-item-img">
                <img src="${element.image}" alt="" srcset="">
                </div>

                <div class="icon">
                    <i class="icons fas fa-play"></i>
                </div>
            </a>
            <div class="album-hot_list-item-title">
                <a href="#" title="${element.name}" class="">${element.name}</a>
            </div>
            </div>
        `;
    });

    albumHotList.innerHTML = renderAlbumHOT.join(" ");
  }

  function renderNewSongs() {
    const songsNew = dataSong;

    const getNewSong = songsNew.filter( element => {
      return element.render == 2
    })
    
    const newSong = getNewSong.map( (element, index) => {
        return {
          id: index + 1,
          songName: element.songName,
          singer: element.singer,
          song: element.song,
          image: element.image
        } 
      })
      
      console.log(newSong)
      console.log(getNewSong[1].singer)

      const listSongsNewVN = document.querySelector(
      ".columns_new-songs .list-song-vn"
    );

  
    for (let i = 0; i < 5; i++) {
      listSongsNewVN.innerHTML += `
            <div class="song-1" id="${newSong[i].id}">
                <div class="song">
                  <div class="image">
                    <div class="cover">
                      <i class="play fas fa-play"></i>
                      <div class="play-wave">
                        <div class="wave active2">
                          <div class="wave1"></div>
                          <div class="wave1"></div>
                          <div class="wave1"></div>
                        </div>
                      </div>
                    </div>
                    <img
                    src="${newSong[i].image}"
                    alt=""
                    srcset=""
                    />
                </div>
                <div class="info-song">
                  <div class="name-song" title="${newSong[i].songName}">${newSong[i].songName}</div>
                    <div class="singers">
                      <a href="#" class="singer-name">${newSong[i].singer[0]}</a> <a href="#" class="singer-name">${newSong[i].singer[1] || ""}</a>  <a href="#" class="singer-name">${newSong[i].singer[2]|| ""}</a>
                    </div>
                </div>
                </div>
                <div class="option">
                  <div class="icon">
                    <i class="three-dots fas fa-ellipsis-h"></i>
                    <div class="btn-options">
                    <div class="btn-point">
                      <div class="btn-icon like">
                        <i class="icon fa-regular fa-heart"></i>
                        <a class="title">Yêu thích</a>
                      </div>
                      <div class="btn-icon download">
                        <i class="icon fas fa-cloud-download"></i>
                        <a href="" download  class="title">Tải xuống</a>
                      </div>
                      <div class="btn-icon share">
                        <i class="icon fas fa-share-square"></i>
                        <a class="title">Chia sẻ</a>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            <div class="frame-song"></div>
     `;

    }


    const listSongsNewAM = document.querySelector(
      ".columns_new-songs .list-song-am"
    );

    for (let i = 5; i < 10; i++) {
      listSongsNewAM.innerHTML += `
            <div class="song-1" id="${newSong[i].id}">
                <div class="song">
                  <div class="image">
                    <div class="cover">
                      <i class="play fas fa-play"></i>
                      <div class="play-wave">
                      <div class="wave active2">
                        <div class="wave1"></div>
                        <div class="wave1"></div>
                        <div class="wave1"></div>
                      </div>
                    </div>
                    </div>
                    <img
                    src="${newSong[i].image}"
                    alt=""
                    srcset=""
                    />
                </div>
                <div class="info-song">
                  <div class="name-song" title="${newSong[i].songName}">${newSong[i].songName}</div>
                    <div class="singers">
                      <a href="#" class="singer-name">${newSong[i].singer[0]}</a> <a href="#" class="singer-name">${newSong[i].singer[1] || ""}</a>  <a href="#" class="singer-name">${newSong[i].singer[2]|| ""}</a>
                    </div>
                </div>
                </div>
                <div class="option">
                  <div class="icon">
                    <i class="three-dots fas fa-ellipsis-h"></i>
                    <div class="btn-options">
                    <div class="btn-point">
                      <div class="btn-icon like">
                        <i class="icon fa-regular fa-heart"></i>
                        <a class="title">Yêu thích</a>
                      </div>
                      <div class="btn-icon download">
                        <i class="icon fas fa-cloud-download"></i>
                        <a href="" download  class="title">Tải xuống</a>
                      </div>
                      <div class="btn-icon share">
                        <i class="icon fas fa-share-square"></i>
                        <a class="title">Chia sẻ</a>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            <div class="frame-song"></div>
     `;

    }


    const listSongsNewHQ = document.querySelector(
      ".columns_new-songs .list-song-hq"
    );

    for (let i = 10; i < 15; i++) {
      listSongsNewHQ.innerHTML += `
            <div class="song-1" id="${newSong[i].id}">
                <div class="song">
                  <div class="image">
                    <div class="cover">
                      <i class="play fas fa-play"></i>
                      <div class="play-wave">
                      <div class="wave active2">
                        <div class="wave1"></div>
                        <div class="wave1"></div>
                        <div class="wave1"></div>
                      </div>
                    </div>
                    </div>
                    <img
                    src="${newSong[i].image}"
                    alt=""
                    srcset=""
                    />
                </div>
                <div class="info-song">
                  <div class="name-song" title="${newSong[i].songName}">${newSong[i].songName}</div>
                    <div class="singers">
                    <a href="#" class="singer-name">${newSong[i].singer[0]}</a> <a href="#" class="singer-name">${newSong[i].singer[1] || ""}</a>  <a href="#" class="singer-name">${newSong[i].singer[2]|| ""}</a>
                    </div>
                </div>
                </div>
                <div class="option">
                  <div class="icon">
                    <i class="three-dots fas fa-ellipsis-h"></i>
                    <div class="btn-options">
                    <div class="btn-point">
                      <div class="btn-icon like">
                        <i class="icon fa-regular fa-heart"></i>
                        <a class="title">Yêu thích</a>
                      </div>
                      <div class="btn-icon download">
                        <i class="icon fas fa-cloud-download"></i>
                        <a href="" download  class="title">Tải xuống</a>
                      </div>
                      <div class="btn-icon share">
                        <i class="icon fas fa-share-square"></i>
                        <a class="title">Chia sẻ</a>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            <div class="frame-song"></div>
     `;

    }
  }

  function rederSinger() {
    
    const singers = dataSinger;

    const singerList = document.querySelector(".list-singer")

    for (var i = 0; i < 7; ) { 
      singerList.innerHTML += `
            <div class="list-singer-item col l-1-4 l-2 m-3 c-3 sm-4 ">
            <div class="group-singer">
              <div class="content-singer">
                <div class="list-singer-item_img">
                  <img src="${singers[i].image} " alt="" srcset="">
                </div>

                <div class="icon">
                  <a href="./index.html#${singers[i].id}" id="${singers[i].id}">
                    <i class="icons fas fa-play"></i>
                  </a>
                </div>

                <div class="info">
                  <div class="singer-name">
                    <div class="singer-name">${singers[i].name}</div>
                    <div class="stage-name">${singers[i].type}</div>
                  </div>
                  
                </div>
              </div>
              <div class="cover"></div>
            </div>
          </div>
      ` 
      i++
    }
  }

  async function renderRanking() {
    const apiRanking = "https://test-json-git-main-tt-2000.vercel.app/ranking"
    
    const resRanking = await axios.get(apiRanking); 

    console.log(resRanking.data)

    const listRanking = document.querySelector(".container-ranking .list-ranking")

    const reder = resRanking.data.map( element => {
      return `
      <a href="./index.html#Rank${element.id}" class="box-ranking" style="background:${element.background};" id="${element.id}">
        <div class="content-ranking">
            <p>${element.topNumber}</p>
            <h3 class="ranking-nation">${element.title}</h3>
        </div>
      </a>
      `
      
    })
    
    listRanking.innerHTML = reder.join("")
  }

  function star() {
    renderSongsTrending();
    renderAlbum();
    renderNewSongs();
    rederSinger();
    renderRanking() 
  }

  star()
}


/*-----------------play Song---------------------------*/ 

async function musicListeningTask(data, album) {
  const getSongTrending = "https://test-json-nu.vercel.app/songs?render=1"
  const getNewSong = "https://test-json-nu.vercel.app/songs?render=2"
  const apiAlbumHot = "https://test-json-tt-2000.vercel.app/albumhot";
  const apiAlbumVN = "https://test-json-tt-2000.vercel.app/VuTruNhacViet";

  
  const resAlbumVN = await axios.get(apiAlbumVN);
  const resAlbumHot = await axios.get(apiAlbumHot);

  const albumhot  = resAlbumHot.data
  const VuTruNhacViet = resAlbumVN.data;

  const trendingSong = await axios.get(getSongTrending);
  const newSong = await axios.get(getNewSong);

  // get list trending Song
  const newListTrending = trendingSong.data.map( (element, index) => {
    return {
      id: index + 1,
      image: element.image,
      singer: element.singer,
      song: element.song,
      songName: element.songName 
    }
  })
  const songTrending = newListTrending
  // get list new Song
  const listSongNew = newSong.data.map( (element, index) => {
    return {
      id: index + 1,
      image: element.image,
      singer: element.singer,
      song: element.song,
      songName: element.songName 
    }
  })
  const songsNew = listSongNew;


  let music = new Audio("./assets/song/HeartbreakAnniversary.mp3");
  
  let index = 0;
  
  
  let addAlbumSong;
  let isPlaying = false;
  let isRepeat = false;
  let isRandom = false;
  let isTrendingSong = false;
  let isNewSong = false;
  let isAlbumVN = false
  let $ = document.querySelector.bind(document);
  let $$ = document.querySelectorAll.bind(document);
  const list_song = $(".playlist-song .songs");


  function firstSongs() {
    let firstSong = data[index];    
    addAlbumSong = songTrending
    
    getListSong(songTrending)
  }

  firstSongs()


  // THANH ÂM NHẠC
  const btn_play = $(".play-controls .btn-toggle-play i");
  const btn_next = $(".play-controls .btn-next i");
  const btn_prev = $(".play-controls .btn-prev i");
  const btn_random = $(".play-controls .btn-random i");
  const btn_repeat = $(".play-controls .btn-repeat i");
  const controls_img = $(".play-controls .contents img");
  const controls_singerName = $(".play-controls .singer-name");
  const controls_songName = $(".play-controls .name-song");
  const singers = $(".play-controls .singers");
  const controls_image = $(".play-controls .image img");

  // SONGS
  const song = $$(".song-1");
  const listSongsTrend = $$(".song-trending");
  const bannerTrending = $(".banner-trending");
  const songTrend = $$(".song-trending .song");
  const songsListActive = $$(".play-controls .song");
  console.log(songsListActive)
  const allSongNew = $$(".song-1")
  // const playWave = $(".play-wave")
  // ÂM LƯỢNG
  const volume = $("#sound");
  const volume_icon = $(".volume i");

  /*---Thời gian bài hát---*/
  const duration = $(".running-time");
  const total_time = $(".total-time");
  const progress = $(".progress");

  /*---Danh sách bài hát---*/
  const listSongs = $(".playlist-song .list-song")
  const song_totalTime = $(".playlist-song .title-right span");

  // CHUUYỂN ĐỔI TRANG 

  const home_menu = $("#home")
  const ranking_menu = $("#ranking")
  const ranking_page = $(".container-ranking")
  const singer_page = $(".container_singer")
  const home_page = $(".container")
  const albumVN_page = $(".container_album-hot")

  function renderContentSong(num) {
    console.log(addAlbumSong)
    const song_title = addAlbumSong.filter((el) => {
      return el.id == num;
    });
    
    song_title.forEach((ele) => {
      const { id, songName, image, singer, song } = ele;
      index = id;
      music.src = song;
      controls_img.src = image;
      controls_songName.innerHTML = songName;
      controls_singerName.innerHTML = `<a href="#" class="singer-name">${ele.singer[0]}</a> <a href="#" class="singer-name">${ele.singer[1] || ""}</a>  <a href="#" class="singer-name">${ele.singer[2]|| ""}</a>`  ;
    });

    music.play();
  }

  // CLick mở nhạc phần bài hát thịnh hành
  function playTrendingSongs() {
  
    bannerTrending.innerHTML = `
        <img src="${songTrending[12].image}" alt="" srcset="">
    `;
    
    const iconBannerSong = $(".banner-trending img");

    listSongsTrend.forEach((ele) => {
      const coverPlay = ele.querySelector(".cover i");
      
      coverPlay.onclick = () => {
        isTrendingSong = true;
        isNewSong = false;
        const song_title = songTrending.filter((el) => {
          return el.id == ele.id;
        });
        
        
        iconBannerSong.src = song_title[0].image
        
        for (const songtrendingActive of songTrend) {
          if (songtrendingActive.matches(".active")) {
            $(".song.active").classList.remove("active");
          }
        }
        
        $$(".song-trending .song")[song_title[0].id - 1].classList.add("active");
              
        addAlbumSong = songTrending;

        renderContentSong(ele.id);
        getListSong(songTrending);
        $$(".play-controls .song")[song_title[0].id - 1].classList.add("active");
      };


    })

    getOptions(listSongsTrend, songTrending);
  }

  // CLick mở nhạc phần bài hát mới
  function playNewSongs() {
    song.forEach((ele) => {
      const coverPlay = ele.querySelector(".cover i");

      coverPlay.onclick = () => {
        isNewSong = true
        isTrendingSong = false;
        addAlbumSong = songsNew;
        
        for (const newSongActive of allSongNew) {
          if (newSongActive.matches(".active")) {
            $(".song-1.active").classList.remove("active");
          }
        }


        $$(".song-1")[ele.id - 1].classList.add("active");
        renderContentSong(ele.id);
        getListSong(songsNew);
        $$(".play-controls .song")[ele.id - 1].classList.add("active");
        
      };
    });
    getOptions(song, songsNew);
  }

                                              // Lấy ra danh sách bài hát
  function getListSong(element) {
    const map = element.map((el) => {
      return `
            <div class="song">

            <div class="title-left">
            <div class="title-left_img">
                <img src="${el.image}" alt="" srcset="">
                <div class="play">
                <i class="fas fa-play-circle"></i>
                </div>
            </div>

            <div class="info-song">
                <div class="name-song">${el.songName}</div>
                <div class="singers">
                <a href="#" class="singer-name">${el.singer[0]}</a> <a href="#" class="singer-name">${el.singer[1] || ""}</a>  <a href="#" class="singer-name">${el.singer[2]|| ""}</a>
                </div>
            </div>
            </div>

            <div class="title-right">
            <div class="total-time">
              <span>5:00</span>
              <div class="icon">
                <i class="three-dots fas fa-ellipsis-h"></i>
                <div class="btn-options">
                <div class="btn-point">
                  <div class="btn-icon like">
                    <i class="fa-regular fa-heart"></i>
                    <a   class="title">Yêu thích</a>
                  </div>
                  <div class="btn-icon download">
                    <i class="fas fa-cloud-download"></i>
                    <a href="" download  class="title">Tải xuống</a>
                  </div>
                  <div class="btn-icon share">
                    <i class="fas fa-share-square"></i>
                    <a  class="title">Chia sẻ</a>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        `;
    });

    list_song.innerHTML = map.join(" ");

    const list_songPlay = list_song.querySelectorAll(".play i");
    const songTotalTime = list_song.querySelectorAll(".title-right .total-time span")

    totalSong(songTotalTime, element)
    list_songPlay.forEach((song, index) => {
      song.onclick = () => {
        // isPlaying = true;

        if (isTrendingSong == true) {
          toggleActiveTredingSong(index + 1)
        }

        if (isPlaying == true) {
          $(".play-controls .song.active").classList.remove("active");
        }

        if (isNewSong == true) {
          toggleActiveNewSong(index + 1)
        }
        renderContentSong(index + 1);
      };
    });
  }


  // Album hot

  function AlbumHot() {
      const btnAH_play = $$(".album-hot .icon") 
      const groupAH = $$(".group-album-hot")
  
      btnAH_play.forEach( (album, index) => {
        album.onclick = () => {
          isNewSong = false
          isTrendingSong = false
  
          renderAlbumHot(groupAH[index].id)
  
        }
      })
  }

  async function renderAlbumHot(id) {
    const apiAlbumHotID = `https://test-json-nu.vercel.app/songs?AlbumHot=${id}`

    const resAlbumHot = await axios.get(apiAlbumHotID);
    
    const nexListSongs =  resAlbumHot.data.map( (element, index) => {
      return {
        id: index + 1,
        image: element.image,
        singer: element.singer,
        song: element.song,
        songName: element.songName 
      }
      
    })

    
    addAlbumSong = nexListSongs


    getListSong(addAlbumSong)
    renderContentSong(1);

  }



  // Tác vụ xử lý thanh âm nhạc
  function musicControlPanel() {
    
    const rotaryCd = controls_image.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });

    rotaryCd.pause();

    btn_play.onclick = () => {
      if (isPlaying) {
        music.pause();
      } else {
        music.play();
      }
    };

    // nhạc chạy
    music.onplay = () => {
      isPlaying = true;
      btn_play.classList.remove("fa-play");
      btn_play.classList.add("fa-pause");

      for (const songslist of songsListActive) {
        if (songslist.matches(".active")) {
          songslist.classList.remove("active");
        }
      } 
      toggleActiveAlbum()
      $$(".play-controls .song")[index - 1].classList.add("active");
      $$(".song-group")[index - 1].classList.add("active")
      
      toggleActiveTredingSong(index)
      toggleActiveNewSong(index)
      rotaryCd.play();
    };

    // nhạc dừng
    music.onpause = () => {
      isPlaying = false;
      btn_play.classList.add("fa-play");
      btn_play.classList.remove("fa-pause");
      rotaryCd.pause();
      $$(".container_album-hot .active2")[index - 1].classList.add("active")
    };

    // Tiến bài hát
    btn_next.onclick = () => {
      if (isRandom) {
          let randomdIndex = Math.floor((Math.random() * addAlbumSong.length));
          do {
            randomdIndex = Math.floor((Math.random() * addAlbumSong.length));
          } while (index == randomdIndex)
          index = randomdIndex
      } else {
          index++
      }

      if (index > addAlbumSong.length) {
        index = 1;
      }

      isRepeat = false;
      btn_repeat.classList.remove("active");
      renderContentSong(index);
      
      if (isAlbumVN == true) {  
        $(".song-group.active").classList.remove("active")
      }

      $(".play-controls .song.active").classList.remove("active");
    };

    // Lùi bài hát
    btn_prev.onclick = () => {
      if (isRandom) {
        let randomdIndex = Math.floor((Math.random() * addAlbumSong.length));
        do {
          randomdIndex = Math.floor((Math.random() * addAlbumSong.length));
        } while (index == randomdIndex)
        index = randomdIndex
      } else {
        index--
      }
      
      if (index < 1) {
        index = addAlbumSong.length;
      }
      
      isRepeat = false;
      btn_repeat.classList.remove("active");
      renderContentSong(index);
      if (isAlbumVN == true) {  
        $(".song-group.active").classList.remove("active")
      }
      $(".play-controls .song.active").classList.remove("active");
    };

    // Lặp lại bài hát
    btn_repeat.onclick = () => {
      isRepeat = !isRepeat;
      btn_repeat.classList.toggle("active", isRepeat);
      isRandom = false;
      btn_random.classList.remove("active");
    };



    // Ngẫu nhiên bài hát
    btn_random.onclick = () => {
      isRandom = !isRandom;
      isRepeat = false;
      btn_repeat.classList.remove("active");
      btn_random.classList.toggle("active", isRandom);
      
    };
    
    // Tổng số thời gian bài hát
    music.onloadedmetadata = function () {
      const minuteTotal = Math.floor(music.duration / 60);
      let secondTotal =
        Math.floor(music.duration) - Math.floor(music.duration / 60) * 60;

      if (secondTotal < 10) {
        secondTotal = `0${secondTotal}`;
      }

      total_time.textContent = `${minuteTotal} : ${secondTotal}`;
    };

    // Thời gian tiến trình bài hát
    music.ontimeupdate = () => {
      const minuteNow = Math.floor(music.currentTime / 60);
      let secondNow =
        Math.floor(music.currentTime) - Math.floor(music.currentTime / 60) * 60;
      if (secondNow < 10) {
        secondNow = `0${secondNow}`;
      }
      if (music.duration) {
        duration.textContent = `${minuteNow} : ${secondNow}`;
        const progressPercent = Math.floor(
          (music.currentTime / music.duration) * 100
        );
        progress.value = progressPercent;
      }
    };


    // Tua bài hát
    progress.oninput = (e) => {
      const seekTime = Math.floor((e.target.value * music.duration) / 100);
      music.currentTime = seekTime;
    };

    // Bài hát kết thúc
    music.onended = () => {
      if (isRepeat == true) {
        music.play();
      } else {
        // btn_next.click();
        $(".play-controls .song.active").classList.remove("active");

        if (isAlbumVN == true) {  
          $(".song-group.active").classList.remove("active")
        } 
        index++
        renderContentSong(index);
      }
      if (isRandom == true) {
        btn_next.click();
      }
    };

    // Điều chỉnh âm lương bài hát
    volume.oninput = () => {
      if (volume.value == 0) {
        volume_icon.classList.remove("fa-volume-down");
        volume_icon.classList.add("fa-volume-mute");
        volume_icon.classList.remove("fa-volume-up");
      }
      if (volume.value > 0) {
        volume_icon.classList.add("fa-volume-down");
        volume_icon.classList.remove("fa-volume-mute");
        volume_icon.classList.remove("fa-volume-up");
      }
      if (volume.value > 50) {
        volume_icon.classList.remove("fa-volume-down");
        volume_icon.classList.remove("fa-volume-mute");
        volume_icon.classList.add("fa-volume-up");
      }

      let vol = volume.value;
      music.volume = vol / 100;
    };3 

    // click tắt/bật âm lượng
    volume_icon.onclick = () => {
      let vol = volume.value;
      if (volume.value > 0) {
        volume_icon.classList.add("fa-volume-mute");
        vol = 0;
        volume.value = 0;
        music.volume = vol / 100;
      } else if (volume.value == 0) {
        vol = 50;
        volume.value = 50;
        music.volume = volume.value / 100;
        volume_icon.classList.remove("fa-volume-mute");
        volume_icon.classList.add("fa-volume-down");
      }

      music.volume = vol / 100;
    };
  }

  // Lấy tác vụ mỗi bài hát
  function getOptions(element, album) {
    element.forEach((ele) => {
      const option = ele.querySelectorAll(".three-dots");
      const btn_like = ele.querySelector(".icon .like");
      const btn_download = ele.querySelector(".icon .download");
      const btn_share = ele.querySelector(".icon .share");
      // const action = $$(".btn-options");
      btn_download.onclick = () => {
        const song_title = album.filter((el) => {
          return el.id == ele.id;
        });
        
        btn_download.querySelector("a").href = song_title[0].song;
      };
      
 

      
      let isOpen = false;
      
      option.forEach( (ele, index) => {
        isOpen = true
        const action = $$(".btn-options"); 

        ele.onclick = () => {
          for (let i of action) {
            if (i.matches(".active")) {
              i.classList.remove("active");
            }
          }
          ele.parentElement.querySelector(".btn-options").classList.add("active");          
        }
        // $("body").onclick = (e) => {
        //   isOpen = false;
        //   if (e.target !== ele) {
            
        //     console.log("dsd")
        //   } 
          
        //   if (isOpen == false) {
        //     $(".btn-options.active").classList.remove("active");
        //   }
          
          
        // }
      })
      

    })

  }

  function toggleActiveTredingSong(index) {
    if (isTrendingSong == true) {
      for (const songtrendingActive of songTrend) {
        if (songtrendingActive.matches(".active")) {
          $(".song.active").classList.remove("active");
        }
      }
      $$(".song-trending .song")[index - 1].classList.add("active");
    } 
    if (isTrendingSong == false) {
      for (const songtrendingActive of songTrend) {
        if (songtrendingActive.matches(".active")) {
          $(".song.active").classList.remove("active");
        }
      }
    }
  }

  function toggleActiveNewSong(index) {
    if (isNewSong == true) {
      for (const newSongActive of allSongNew) {
        if (newSongActive.matches(".active")) {
          $(".song-1.active").classList.remove("active");
        }
      }
      $$(".song-1")[index - 1].classList.add("active");
    }
    if (isNewSong == false) { 
      for (const newSongActive of allSongNew) {
        if (newSongActive.matches(".active")) {
          $(".song-1.active").classList.remove("active");
        }
      }
    } 
  }

  function toggleActiveAlbum() {
      const allWave = $$(".active2")

      for(let i of allWave) {
        if (i.matches(".active")) {
          i.classList.remove("active")
        } 
      }
  }  

  // SINGER
  async function renderSinger(id) {
    // const getID = location.hash.slice(1)
    
    const apiID = `https://test-json-nu.vercel.app/songs?content_owner=${id}`
    const apiSingers = `https://test-json-nu.vercel.app/singer?id=${id}`
    


    const resID = await axios.get(apiID);
    const resSingers =  await axios.get(apiSingers);
    console.log(resID.data)
    const newSong = resID.data.map( (element, index) => {
        return {
            id: index + 1,
            songName : element.songName,
            song: element.song,
            image:element.image,
            singer: element.singer,
        }
    })

    addAlbumSong = newSong
    
    const listSong = $(".list")
    const contentBanber = $(".content-banner")
    
      const render = newSong.map( (element, index) => {
          return `
                  <div class="song-group">
                  <div class="song-group_left">
                  <span class="order">${index + 1}</span>
                  <span class="title">
                      <img
                      src="${element.image}"
                      alt=""
                      srcse=""
                      />
                      <div class="content-song_album-hot">
                      <div class="name-song">${element.songName}</div>
                      <div>
                      <a href="#" class="singer-name">${element.singer[0]}</a> <a href="#" class="singer-name">${element.singer[1] || ""}</a>  <a href="#" class="singer-name">${element.singer[2]|| ""}</a>
                      </div>
                      </div>
                  </span>
                  </div>
                  <div class="song-group_right">
                  <span class="full-time">5:00</span>
                  </div>
                  <div class="cover">
                  
                      <i class="fas fa-play"></i>
                  
                  </div>
              </div>
          `
      })
      
      listSong.innerHTML = render.join("")
    

    

    const renderBanner = resSingers.data.map( element => {
        return `
            <img src="${element.image}" alt="" srcset="" />
                <div class="content_singer">
                <p>${(element.type).toUpperCase()}</p>
                <h2>${element.name}</h2>
            </div>
        `
    })

    contentBanber.innerHTML = renderBanner.join("")

    const nameAlbum = $(".album-singer .album-hot_title")

    console.log(nameAlbum)

    nameAlbum.innerHTML += `
      <div class="heading">Có sự xuất hiện của ${resSingers.data[0].name}</div>
    `

    
    getListSong(newSong)    
  }

  function getSinger() {
    let isSinger = false

    const list_singer = $(".list-singer")
    const btn_singer = list_singer.querySelectorAll(".icon a")

    btn_singer.forEach( btn => {
        btn.onclick = () => {
          isSinger = true
          home_page.style.display = "none"
          singer_page.style.display = "block"
          renderSinger(btn.id)
          console.log(btn_singer)
        }
    })    
  }
  
  async function renderSongRanking(id) {
    // const windowLocation = `http://127.0.0.1:5500/project-webMusic/index.html#ABVN${id}`

    const apiId = `https://test-json-tt-2000.vercel.app/songs?ranking=${id}`

    const resSongRanking = await axios.get(apiId);
    
    const filterSong = data.filter( song => {
      return song.ranking == resSongRanking.data[0].ranking
    })

    const newAlbum = filterSong.map( (element, index)=> {
      return {
        id: index + 1,
        songName : element.songName,
        song: element.song,
        image:element.image,
        singer: element.singer,
      }
    })
    
    const listAlbumVN = albumVN_page.querySelector(" .list")
    
    addAlbumSong = newAlbum

    const renderHTML = newAlbum.map( (element, index) => {
      return `
      <div class="song-group">
        <div class="song-group_left">
          <div class="list-order">
              <span class="order">${index + 1}</span>
              <i class="icon-play fas fa-play"></i>
              <div class="play-wave">
                <div class="wave active2">
                  <div class="wave1"></div>
                  <div class="wave1"></div>
                  <div class="wave1"></div>
                  <div class="wave1"></div>
                </div>
              </div>
          </div>
          <span class="title">
          <div class="image">
            <img
            src="${element.image}"
            alt=""
            srcset=""
          />
          </div>
          <div class="content-song_album-hot">
            <div class="name-song">${element.songName}</div>
            <div>
            <a href="#" class="singer-name">${element.singer[0]}</a> <a href="#" class="singer-name">${element.singer[1] || ""}</a>  <a href="#" class="singer-name">${element.singer[2]|| ""}</a>
            </div>
          </div>
        </span>
      </div>
        <div class="song-group_right">
          <div class="cover">

          <i class="icon fa-regular fa-heart"></i>
          <i class="icon fas fa-share-square"></i>
          <i class="icon fas fa-cloud-download"></i>
          </div>
          <span class="full-time">5:00</span>
          </div>
        </div>
          `
        })
        
        
    listAlbumVN.innerHTML= renderHTML.join("")
        
    const song_group = $$(".song-group")
    const totalABVN = $$(".full-time")
   
    totalSong(totalABVN, newAlbum)

    song_group.forEach( (element, index) => {
      const playAVN = element.querySelector(".icon-play")
      
      playAVN.onclick= () => {
        for(let i of song_group) {
          if (i.matches(".active")) {
            $(".song-group.active").classList.remove("active")
            $(".play-controls .song.active").classList.remove("active");
          }
        }  
        renderContentSong(index + 1)
      }
    })

    getListSong(newAlbum)
    renderContentSong(index + 1)

    
  }
  
  function getListSongRanking() {

    const btn_songRanking = document.querySelectorAll(".container-ranking a")
    btn_songRanking.forEach( (btn) => {
      console.log(btn)

        btn.onclick = () => {
          isAlbumVN = true
          home_page.style.display = "none"
          albumVN_page.style.display = "block"
          renderSongRanking(btn.id)
        }
    })
    
    // const windowLocation = `http://127.0.0.1:5500/project-webMusic/index.html#ABVN${1}`
    
  }
  
  async function renderAlbumVN(id) {
    // const windowLocation = `http://127.0.0.1:5500/project-webMusic/index.html#ABVN${id}`

    const apiId = `https://test-json-tt-2000.vercel.app/songs?albumVN=${id}`

    const resAVN = await axios.get(apiId);

    const filterSong = data.filter( song => {
      return song.albumVN[0] == resAVN.data[1].albumVN || song.albumVN[1] == resAVN.data[1].albumVN 
    })

    console.log(filterSong)

    const newAlbum = filterSong.map( (element, index)=> {
      return {
        id: index + 1,
        songName : element.songName,
        song: element.song,
        image:element.image,
        singer: element.singer,
      }
    })
    
    const listAlbumVN = albumVN_page.querySelector(" .list")
    
    addAlbumSong = newAlbum

    const renderHTML = newAlbum.map( (element, index) => {
      return `
      <div class="song-group">
        <div class="song-group_left">
          <div class="list-order">
              <span class="order">${index + 1}</span>
              <i class="icon-play fas fa-play"></i>
              <div class="play-wave">
                <div class="wave active2">
                  <div class="wave1"></div>
                  <div class="wave1"></div>
                  <div class="wave1"></div>
                  <div class="wave1"></div>
                </div>
              </div>
          </div>
          <span class="title">
          <div class="image">
            <img
            src="${element.image}"
            alt=""
            srcset=""
          />
          </div>
          <div class="content-song_album-hot">
            <div class="name-song">${element.songName}</div>
            <div>
            <a href="#" class="singer-name">${element.singer[0]}</a> <a href="#" class="singer-name">${element.singer[1] || ""}</a>  <a href="#" class="singer-name">${element.singer[2]|| ""}</a>
            </div>
          </div>
        </span>
      </div>
        <div class="song-group_right">
          <div class="cover">

          <i class="icon fa-regular fa-heart"></i>
          <i class="icon fas fa-share-square"></i>
          <i class="icon fas fa-cloud-download"></i>
          </div>
          <span class="full-time">5:00</span>
          </div>
        </div>
          `
        })
        
        
    listAlbumVN.innerHTML= renderHTML.join("")
        
    const song_group = $$(".song-group")
    const totalABVN = $$(".full-time")
   
    totalSong(totalABVN, newAlbum)

    song_group.forEach( (element, index) => {
      const playAVN = element.querySelector(".icon-play")
      
      playAVN.onclick= () => {
        for(let i of song_group) {
          if (i.matches(".active")) {
            $(".song-group.active").classList.remove("active")
            $(".play-controls .song.active").classList.remove("active");
          }
        }  
        renderContentSong(index + 1)
      }
    })

    getListSong(newAlbum)
    renderContentSong(index + 1)

    
  }
  
  function getAlbumVN() {

    const btn_albumVN = document.querySelectorAll(".album-hot_list-vn .icon a")
    
    btn_albumVN.forEach( (btn) => {

        btn.onclick = () => {
          isAlbumVN = true
          home_page.style.display = "none"
          albumVN_page.style.display = "block"
          renderAlbumVN(btn.id)
        }
    })
    
    // const windowLocation = `http://127.0.0.1:5500/project-webMusic/index.html#ABVN${1}`
    
  }




  function pageSwitching() {
    const locationHome = "http://127.0.0.1:5500/project-webMusic/index.html"

    if(window.location == locationHome) {
  
        home_page.style.display = "block";
    }
    console.log(ranking_menu.parentElement)
    
    home_menu.onclick = () => {

      window.location = locationHome
      home_page.style.display = "block";
      
      $("li.active").classList.remove("active")

      
    }

    ranking_menu.onclick = () => {
      ranking_page.style.display = "block"
      home_page.style.display = "none";
      
      $("li.active").classList.remove("active")
      ranking_menu.parentElement.classList.add("active")
    }
  }

  function totalSong(total, element) {
    for (let i = 0; i < element.length; i++) {
      const newAudio = new Audio(element[i].song)
      newAudio.onloadedmetadata = function () {
        const minuteTotal = Math.floor(newAudio.duration / 60);
        let secondTotal =
          Math.floor(newAudio.duration) - Math.floor(newAudio.duration / 60) * 60;
  
        if (secondTotal < 10) {
          secondTotal = `0${secondTotal}`;
        }
        total[i].innerHTML = `${minuteTotal}:${secondTotal}`;
        };
      }
  }

  function star() {
    playTrendingSongs();
    playNewSongs();
    musicControlPanel();
    AlbumHot()
    pageSwitching()
    getAlbumVN()
    getSinger() 
    getListSongRanking() 
  }

  star();
}



/* ------------New song responsive------------ */

const btnRoaming = document.querySelectorAll(".button");
const listNewSongs = document.querySelectorAll(".column-ns");

btnRoaming.forEach((btn, index) => {
  const listSong = listNewSongs[index];

  btn.onclick = () => {
    document.querySelector(".button.active").classList.remove("active");
    document.querySelector(".column-ns.active").classList.remove("active");
    btn.classList.add("active");
    listSong.classList.add("active");
  };
});



// BANNER

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});




const bannerPage = document.querySelector(".container_album-hot .content-bar")
const bar = document.querySelector(".container_album-hot .content-bar")
const header = document.querySelector(".container_album-hot .header")


window.onscroll = () => {
    // console.log(bar.offsetTop - window.scrollY)
    if ((bar.offsetTop - window.scrollY) <= 62 ) {
        bannerPage.style.position = "fixed"
        bannerPage.style.background = "#1c1e22";

    } 
    if ((bar.offsetTop - window.scrollY) > -54 ) {
        bannerPage.style.position = "static";
        bannerPage.style.background = "#1f1d1f";

    }
}


