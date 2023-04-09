// Lỗi bài hát đầu tiên
// Lỗi click next và page ranking thì list trending cx chạy
// SEARCH

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
                        <a href="#" class="singer-name">${element.singer[0]}</a> <a href="#" class="singer-name">${element.singer[1] || ""}</a>  <a href="#" class="singer-name">${element.singer[2]|| ""}</a>
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
                          <a href="index.html#" id="${element.id}">
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
            <a class="album-hot_list-item" id="${element.id}">
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
                  <a href="#" id="${singers[i].id}">
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
    // ./index.html#${singers[i].id}
  }

  async function renderRanking() {
    const apiRanking = "https://test-json-git-main-tt-2000.vercel.app/ranking"
    
    const resRanking = await axios.get(apiRanking); 

    const listRanking = document.querySelector(".container-ranking .list-ranking")

    const reder = resRanking.data.map( element => {
      return `
      <a href="./index.html#" class="box-ranking" style="background:${element.background};" id="${element.id}">
        <div class="content-ranking">
            <p>${element.topNumber}</p>
            <h3 class="ranking-nation">${element.title}</h3>
        </div>
      </a>
      `
      
    })
    
    listRanking.innerHTML = reder.join("")
  }

  async function renderHotTopic() {
    const apiTopic = "https://test-json-git-main-tt-2000.vercel.app/hotTopic"
    const resTopic = await axios.get(apiTopic); 
    const dataTopic = resTopic.data
    const listTopic = document.querySelector(".list_hot-topic")

    for(let topic = 0; topic < 4; ) {
      listTopic.innerHTML += `
      <a href="./index.html#" class="box box-${dataTopic[topic].id}" id="${dataTopic[topic].id}">
          <h3 class="heading_hot-topic">${dataTopic[topic].title}</h3>
          <img src="${dataTopic[topic].imageHome}" alt="">
      </a>
      
      `
      topic++
    }


  }

  function star() {
    renderSongsTrending();
    renderAlbum();
    renderNewSongs();
    rederSinger();
    renderRanking() 
    renderHotTopic()
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
  let addAlbumHot;
  let isPlaying = false;
  let isRepeat = false;
  let isRandom = false;
  let isTrendingSong = false;
  let isNewSong = false;
  let isAlbumVN = false
  let isSinger = false;
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
  const song = $$(".song");
  const listSongsTrend = $$(".song-trending");
  const bannerTrending = $(".banner-trending");
  const songTrend = $$(".song-trending .song");
  const songsListActive = $$(".play-controls .song");
  const allSongNew = $$(".song-1")
  const allAlbumHot = $$(".album-hot_list .album-hot_list-item")

  
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
    console.log(num)

    const song_title = addAlbumSong.filter((el) => {
      return el.id == num;
    });
    
    console.log(song_title)

    song_title.forEach((ele) => {
      index = ele.id;
      music.src = ele.song;
      controls_img.src = ele.image;
      controls_songName.innerHTML = ele.songName;
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
    allSongNew.forEach((ele) => {
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

  // Album hot
  function AlbumHot() {
      const btnAH_play = $$(".album-hot .icons") 

      btnAH_play.forEach( (album, index) => {
        album.onclick = () => {
          isNewSong = false
          isAlbumVN = false
          isTrendingSong = false
          allAlbumHot[index].classList.add("active")
          renderAlbumHot(allAlbumHot[index].id)
        }

        $("body").onclick = (e) => {
          if (isNewSong == true || isAlbumVN == true || isTrendingSong == true || isSinger == true) {
            for (let album of allAlbumHot) {
              if (album.matches(".active")) {
                album.classList.remove("active")
              }
            }
          }
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

      $$(".play-controls .song")[index - 1].classList.add("active");
      
      if (isAlbumVN == true) {
        toggleActiveAlbumWave()
        $$(".song-group")[index - 1].classList.add("active")
      }

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
      if (isAlbumVN == true) {
        $$(".container_album-hot .active2")[index - 1].classList.add("active")
      }
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
        if (isAlbumVN == true) {  
            $(".song-group.active").classList.remove("active")
        } 

        index++
        if (index > addAlbumSong.length) {
          index = 1
        }
        renderContentSong(index);
        // btn_next.click();
        $(".play-controls .song.active").classList.remove("active");

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
    };

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
      // btn_download.onclick = () => {
      //   const song_title = album.filter((el) => {
      //     return el.id == ele.id;
      //   });

      //   btn_download.querySelector("a").href = song_title[0].song;
      // };
      
    
      
      option.forEach( (ele, index) => {
        

        const action = $$(".btn-options"); 
        ele.onclick = (e) => {
          for (let i of action) {
            if (i.matches(".active")) {
              i.classList.remove("active");
            }
          }
          console.log(option[index])
          ele.parentElement.querySelector(".btn-options").classList.add("active");       
          console.log(e.target)   
 
          $("body").onclick = (e) => {
            if (e.target !== ele) {
              ele.parentElement.querySelector(".btn-options.active").classList.remove("active");
            } 
          }
        }
      })
    })
  }

  function toggleActiveTredingSong(index) {
    if (addAlbumSong !== songTrending) {
      isTrendingSong = false
    }
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
    if (addAlbumSong !== songsNew) {
      isNewSong = false
    }
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

  function toggleActiveAlbumWave() {
      const allWave = $$(".active2")

      for(let i of allWave) {
        if (i.matches(".active")) {
          i.classList.remove("active")
        } 
      }
  }  

  // SINGER
  async function renderSinger(id) {
    
    const apiID = `https://test-json-nu.vercel.app/songs?content_owner=${id}`
    const apiSingers = `https://test-json-nu.vercel.app/singer?id=${id}`
    const apiAlbum = "https://test-json-git-main-tt-2000.vercel.app/album"
    const apiSongAlbum = `https://test-json-git-main-tt-2000.vercel.app/album?id=${id}`

    const resAlbum = await axios.get(apiAlbum);
    const resSongAlbum = await axios.get(apiSongAlbum);

    const resID = await axios.get(apiID);
    const resSingers =  await axios.get(apiSingers);

    const newSong = resID.data.map( (element, index) => {
        return {
            id: index + 1,
            songName : element.songName,
            song: element.song,
            image:element.image,
            singer: element.singer,
            AlbumHot: element.AlbumHot,
            album: element.album
        }
    })

    $("body").style.background = "#1f1d1f"

    const filter = resID.data.filter( ele => {
      return ele.album
    })

    let arr = []
    for(let i = 0; i < filter.length; i++) {
      if (!arr.includes(filter[i].album)) {        
        arr.push(filter[i].album)
      } 
    }

    const album_list = $(".container_singer .album-hot_list")

    const renderAlbumSinger = arr.map( ele => {
      return `
          <div class="group-album-hot col l-2-4 l-2 c-2 m-3 c-3 sm-4">
          <div class="album-hot_list-item">
              <div class="album-hot_list-item-img">
              <img src="${resAlbum.data[ele - 1].image}" alt="" srcset="">
              </div>

              <div class="icon">
                <a id="${resAlbum.data[ele - 1].id}">
                  <i class="icons fas fa-play"></i>
                </a>
              </div>
          </div>
          <div class="album-hot_list-item-title">
              <a href="#" class="">${resAlbum.data[ele - 1].name}</a>
          </div>
          </div>
      `
    })

    album_list.innerHTML = renderAlbumSinger.join("")

    const btn_playAlbum = $$(".container_singer .group-album-hot .icon a")

    btn_playAlbum.forEach( element => {
    
      const btn = element.querySelector("i")
      
      btn.onclick =  () => {
        const filterSong = data.filter( ele => {
          return ele.album == resAlbum.data[element.id - 1].id
        })

        const newSongSinger = filterSong.map( (ele, index) => {
          return {
            id: index + 1,
            songName :  ele.songName,
            song:   ele.song,
            image:  ele.image,
            singer:   ele.singer,
            AlbumHot:   ele.AlbumHot,
            album:  ele.album
          }
        })
        
        addAlbumSong = newSongSinger
        // addAlbumSong = newSong
        // addAlbumHot = 
        renderContentSong(1)
        getListSong(newSongSinger)
      }
    })
    

    // song singer
    const listSong = $(".list")
    const contentBanber = $(".content-banner")
    
      const render = newSong.map( (element, index) => {
          return `
                  <div class="song-group-singer">
                  <div class="song-group_left">
                    <div class="group-order">
                      <i class="icon-play fas fa-play"></i>
                      <span class="order">${index + 1}</span>
                    </div>
                    <span class="title">
                      <div class="image">
                        <img src="${element.image}" alt="" srcse=""/>
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
                          <i class='icon bx bx-station station'></i>
                          <i class='icon bx bx-heart'></i>
                          <i class='icon bx bx-share' ></i>
                          <i class='icon bx bxs-cloud-download' ></i>
                    </div>
                        <span class="full-time">5:00</span>
                  </div>
              </div>
          `
      })
      
      listSong.innerHTML = render.join("")
      
      const totalSongSinger = $$(".container_singer .full-time")

      totalSong(totalSongSinger, newSong)

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

    const nameAlbum = $(".container_singer .album-hot_title")

    const renderHeadingAlbum = resSingers.data.map( element => {
      return `
      <div class="category-heading">Có sự xuất hiện của ${element.name}</div>
      <a href="#"> Tất cả
        <i class="fas fa-chevron-right"></i>
      </a>
      `
    })

    nameAlbum.innerHTML = renderHeadingAlbum.join("")
    
    

    const song_group = $$(".container_singer .song-group-singer")
    song_group.forEach( (element, index) => {

      const playAVN = element.querySelector(".icon-play")
      const btn_station = element.querySelector(".station")
      
      playAVN.onclick= () => {
        isSinger = true
        console.log("sd")
        console.log(index)
        for(let i of song_group) {
          if (i.matches(".active")) {
            $(".song-group.active").classList.remove("active")
            $(".play-controls .song.active").classList.remove("active");
          }
        }  
        addAlbumSong = newSong
        addAlbumHot = newSong[index].songName

        getListSong(newSong)
        renderContentSong(index + 1)
        
      }

      btn_station.onclick = () => {
        
        const fil = data.filter( element => {
          return element.AlbumHot == newSong[index].AlbumHot || element.album == newSong[index].album
        })
        
        const newList = fil.map( (element, index) => {
          return {
            id: index + 1,
            songName : element.songName,
            song: element.song,
            image:element.image,
            singer: element.singer,
            AlbumHot: element.AlbumHot,
            album: element.album
          }
        })

        addAlbumSong = newList
        getListSong(newList)
      
      }


    })
  }
  
  //  ALBUM VN
  async function renderAlbumVN(id) {

    const apiId = `https://test-json-tt-2000.vercel.app/songs?albumVN=${id}`

    const resAVN = await axios.get(apiId);

    const filterSong = data.filter( song => {
      return song.albumVN[0] == resAVN.data[1].albumVN || song.albumVN[1] == resAVN.data[1].albumVN 
    })

    const banner = VuTruNhacViet[id - 1]

    const newAlbum = filterSong.map( (element, index)=> {
      return {
        id: index + 1,
        songName : element.songName,
        song: element.song,
        image:element.image,
        singer: element.singer,
      }
    })
    
    

    $("body").style.background = "#1f1d1f"
    const bannerAHVN = document.querySelector(".container_album-hot .content-banner")
    const listAlbumVN = albumVN_page.querySelector(" .list")
    
    bannerAHVN.innerHTML = `
        <img src="${banner.image}" alt="" srcset="" />
        <div class="content_album">
          <p>PLAYLIST</p>
          <h2>${banner.name}</h2>
        </div>
    `
    
    const renderHTML = newAlbum.map( (element, index) => {
      return `
      <div class="song-group song">
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
            <img src="${element.image}" alt="" srcset=""
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

            <i class='icon bx bx-heart'></i>
            <i class='icon bx bx-share' ></i>
            <i class='icon bx bxs-cloud-download' ></i>
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
        isAlbumVN = true
        console.log(newAlbum)
        addAlbumSong = newAlbum
        
        
        console.log("ds")
        for(let i of song_group) {
          if (i.matches(".active")) {
            $(".song-group.active").classList.remove("active")
            $(".play-controls .song.active").classList.remove("active");
          }
        }  
        renderContentSong(index + 1)
        getListSong(newAlbum)
      }
    })
  }

  //  HOT TOPIC
  async function renderHotTopic(id) {
    const apiRanking = "https://test-json-git-main-tt-2000.vercel.app/hotTopic"
    const apiIdTopic = `https://test-json-git-main-tt-2000.vercel.app/songs?hot-Topic=${id}`
    
    const resHotTopic = await axios.get(apiIdTopic);
    const resTopic = await axios.get(apiRanking);

    const banner = resTopic.data[id - 1]

    const newAlbum = resHotTopic.data.map( (element, index)=> {
      return {
        id: index + 1,
        songName : element.songName,
        song: element.song,
        image:element.image,
        singer: element.singer,
      }
    })

    $("body").style.background = "#1f1d1f"
    const listAlbumVN = albumVN_page.querySelector(" .list")
    const bannerAHVN = document.querySelector(".container_album-hot .content-banner")
    
    bannerAHVN.innerHTML = `
        <img src="${banner.imagePage}" alt="" srcset="" />
        <div class="content_album">
          <p>PLAYLIST</p>
          <h2>${banner.title}</h2>
        </div>
      ` 

    addAlbumSong = newAlbum

    console.log(isAlbumVN)
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
            <img src="${element.image}" alt="" srcset=""
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
            <i class='icon bx bx-heart'></i>
            <i class='icon bx bx-share' ></i>
            <i class='icon bx bxs-cloud-download' ></i>
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
        isAlbumVN = true
        for(let i of song_group) {
          if (i.matches(".active")) {
            $(".song-group.active").classList.remove("active")
            $(".play-controls .song.active").classList.remove("active");
          }
        }  
        renderContentSong(index + 1)
        getListSong(newAlbum)    
      }
    })

  }

  // RANKING
  async function renderSongRanking(id) {
    
    const apiRanking = `https://test-json-git-main-tt-2000.vercel.app/ranking`;
    const apiId = `https://test-json-tt-2000.vercel.app/songs?ranking=${id}`

    const resSongRanking = await axios.get(apiId);
    const resRanking = await axios.get(apiRanking);

    const newAlbum = resSongRanking.data.map( (element, index)=> {
      return {
        id: index + 1,
        songName : element.songName,
        song: element.song,
        image:element.image,
        singer: element.singer,
      }
    })
    
    const banner = resRanking.data[id - 1]

    $("body").style.background = "#1f1d1f"
    const listAlbumVN = albumVN_page.querySelector(" .list")
    const bannerRanking = document.querySelector(".container_album-hot .content-banner")
      
    bannerRanking.innerHTML = `
        <img src="${banner.image}" alt="" srcset="" />
        <div class="content_album">
          <p>${banner.topNumber}</p>
          <h2>${banner.title}</h2>
        </div>
    `
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
            <i class='icon bx bx-heart'></i>
            <i class='icon bx bx-share' ></i>
            <i class='icon bx bxs-cloud-download' ></i>
          </div>
          <span class="full-time">5:00</span>
          </div>
        </div>
          `
        })
        
        
        listAlbumVN.innerHTML= renderHTML.join("")
        
    const song_group = $$(".container_album-hot .song-group")
    const totalABVN = $$(".full-time")

    console.log(song_group)
    
    totalSong(totalABVN, newAlbum)
    
    song_group.forEach( (element, index) => {
      const playAVN = element.querySelector(".icon-play")
      
      playAVN.onclick= () => {
        addAlbumSong = newAlbum
        
        for(let i of song_group) {
          if (i.matches(".active")) {
            i.classList.remove("active")
            $(".play-controls .song.active").classList.remove("active");
          }
        }  

        

        renderContentSong(index + 1)
        getListSong(newAlbum)
      }
    })

    
  }
  
  function pageSwitching() {
    
    const menu_li = $$(".menu-sidebar li")

    // Page home
    home_menu.onclick = () => {
      // window.location = "http://127.0.0.1:5500/project-webMusic/index.html"
      home_page.style.display = "block";
      albumVN_page.style.display = "none"
      ranking_page.style.display = "none"
      singer_page.style.display = "none"

      for(let song of menu_li) {
        if (song.matches(".active")) {
          song.classList.remove("active")
        }
      }
      home_menu.parentElement.classList.add("active")
    }

    // Page ranking
    ranking_menu.onclick = () => {
      ranking_page.style.display = "block"
      home_page.style.display = "none";
      albumVN_page.style.display = "none"
      singer_page.style.display = "none"

      for(let song of menu_li) {
        if (song.matches(".active")) {
          song.classList.remove("active")
        }
      }
      ranking_menu.parentElement.classList.add("active")
    }

    // Page list song album hot vn    
    const btn_albumVN = document.querySelectorAll(".album-hot_list-vn .icon a")
    
    btn_albumVN.forEach( (btn) => {
      btn.onclick = () => {
          ranking_page.style.display = "none"
          home_page.style.display = "none"
          singer_page.style.display = "none"
          albumVN_page.style.display = "block"
          renderAlbumVN(btn.id)

          for(let song of menu_li) {
            if (song.matches(".active")) {
              song.classList.remove("active")
            }
          }
        }
    })

    // Page list song singer
    const list_singer = $(".list-singer")
    const btn_singer = list_singer.querySelectorAll(".icon a")

    btn_singer.forEach( btn => {
        btn.onclick = () => {
          isSinger = true
          isAlbumVN = false
          ranking_page.style.display = "none"
          albumVN_page.style.display = "none"
          home_page.style.display = "none"
          singer_page.style.display = "block"
          $("li.active").classList.remove("active")
          renderSinger(btn.id)
          
          for(let song of menu_li) {
            if (song.matches(".active")) {
              song.classList.remove("active")
            }
          }
        }
    })   

    // Page list song ranking
    const btn_songRanking = document.querySelectorAll(".container-ranking a")

    btn_songRanking.forEach( (btn) => {

        btn.onclick = () => {
          isAlbumVN = true
          isSinger = false
          singer_page.style.display = "none"
          ranking_page.style.display = "none"
          home_page.style.display = "none";
          albumVN_page.style.display = "block"
          $("li.active").classList.remove("active")
          renderSongRanking(btn.id)

          for(let song of menu_li) {
            if (song.matches(".active")) {
              song.classList.remove("active")
            }
          }
        }
    })


    const btn_hotTopic = document.querySelectorAll(".list_hot-topic a")

    btn_hotTopic.forEach( (btn) => {

        btn.onclick = () => {
          
          singer_page.style.display = "none"
          ranking_page.style.display = "none"
          home_page.style.display = "none";
          albumVN_page.style.display = "block"
          $("li.active").classList.remove("active")
          renderHotTopic(btn.id)

          for(let song of menu_li) {
            if (song.matches(".active")) {
              song.classList.remove("active")
            }
          }
        }
    })


    



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

  function search() {
    let search_results = document.querySelector(".search_results")

    data.forEach( element => {
        
        let card = document.createElement("div")
        card.classList.add("card")
        card.id = element.id; 
        card.innerHTML = `
          <a class="content-card">
            <div class="image">
              <img src="${element.image}" alt="">
            </div>
            <div class="info-song">
              <p class="name-song">${element.songName}</p>
              <div class="singers">
                 <a href="#" class="singer-name">${element.singer[0]}</a>  <a href="#" class="singer-name">${element.singer[1] || ""}</a>  <a href="#" class="singer-name">${element.singer[2]|| ""}</a>
              </div>
            </div>
          </a>
        `
        
        search_results.appendChild(card)
        
        
      })
      

      let search_input = document.querySelector(".search input")
      let items = search_results.querySelectorAll(".card")
      
      search_input.onkeyup = () => {
          let input_value = search_input.value.toUpperCase()
        
          for (let i = 0; i < items.length; i++) {
                  let as = items[i].querySelectorAll(".name-song")[0]
                  let text_value = as.textContent || as.innerHTML;
              

                  if (text_value.toUpperCase().indexOf(input_value) > -1) {
                      items[i].style.display = "flex"
                  } else {
                      items[i].style.display = "none"

                  }
              
          }

          if (input_value == 0) {
              search_results.style.display = "none"
          } else {
              search_results.style.display = "block"

          }
      }

      items.forEach( play => {
        play.onclick = () => {
          isPlaying = true
          
          const filterAlbum = data.filter( song => {
            return song.AlbumHot == data[play.id - 1].AlbumHot
          })
          
          addAlbumSong = data
          renderContentSong(data[play.id - 1].id)
          const newAlbumHot = filterAlbum.map( (element, index) => {
            return {
              id: index + 1,
              image: element.image,
              singer: element.singer,
              song: element.song,
              songName: element.songName,
              AlbumHot: element.AlbumHot
            }
          }) 
          
          
          
          
          addAlbumSong = newAlbumHot

          getListSong(newAlbumHot)
          search_input.value = ""
          search_results.style.display = "none"
        }
      })
  }

  // Lấy ra danh sách bài hát
  function getListSong(element) {



    // console.log(element)
    // console.log(index)
    // console.log(data[index - 1])

    // if (isPlaying == true) {
    //   const filter = element.filter( ele => {
    //     return ele.AlbumHot == data[index - 1].AlbumHot
    //   })
      
    //   const find = filter.find( element => {
    //     return element.songName == data[index - 1].songName
    //   })
    //   $$(".play-controls .song")[find.id - 1].classList.add("active");
    // }
    // console.log(find.id)
    
    const map = element.map((el) => {
      return `
            <div class="song" id="${el.id}">
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
                    <i class='icon bx bx-heart'></i>
                    <a   class="title">Yêu thích</a>
                  </div>
                  <div class="btn-icon download">
                    <i class='icon bx bxs-cloud-download' ></i>
                    <a href="" download  class="title">Tải xuống</a>
                  </div>
                  <div class="btn-icon share">
                    <i class='icon bx bx-share' ></i>
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
    getOptions($$(".play-controls .song"), element)
    
    const songTotalTime = list_song.querySelectorAll(".title-right .total-time span")
    totalSong(songTotalTime, element)
    
    const list_songPlay = list_song.querySelectorAll(".play i");

    list_songPlay.forEach((song, index) => {
    
      song.onclick = () => {
        if (isTrendingSong == true) {
          toggleActiveTredingSong(index + 1)
        }

        for (let i  of $$(".play-controls .song")) {
          if (i.matches(".active")) {
            $(".play-controls .song.active").classList.remove("active");
          } 
        }

        if (isNewSong == true) {
          toggleActiveNewSong(index + 1)
        }
        renderContentSong(index + 1);
      };
    });

    const find = addAlbumSong.find( ele => {
      return ele.songName == addAlbumHot
    })

    if (isSinger == true) {
      index = find.id
      $$(".play-controls .song")[find.id - 1].classList.add("active")
    }


  }

  function star() {
    playTrendingSongs();
    playNewSongs();
    musicControlPanel();
    AlbumHot()
    pageSwitching()
    search() 
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
    if ((bar.offsetTop - window.scrollY) <= 62 ) {
        bannerPage.style.position = "fixed"
        bannerPage.style.background = "#1c1e22";

    } 
    if ((bar.offsetTop - window.scrollY) > -49 ) {
        bannerPage.style.position = "static";
        bannerPage.style.background = "#1f1d1f";

    }
}


/* ----------------open/close list song--------------- */

const iconListSong = document.querySelector("#icon-list_song");
const iconClose = document.querySelector(".playlist-song-heading i");
const listSong = document.querySelector(".playlist-song");

iconListSong.onclick = () => {
  const toggleList = listSong.classList.toggle("active");
  if (toggleList == true) {
    
    listSong.style.opacity = "1";
  } else {
    listSong.style.opacity = "0.3";

  }
};

iconClose.onclick = () => {
  listSong.classList.remove("active");
  listSong.style.opacity = "0.3";
};


/* ------Menu responsive active------- */

const bars = document.querySelector(".bars");
const activeMenuSidebar = document.querySelector(".menu-sidebar ");

bars.onclick = () => {
  activeMenuSidebar.classList.toggle("active");
};