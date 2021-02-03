new Vue({
    el:"#app",
    data:{
        query: "",
        musicList: [],
        musicUrl: "",
        picUrl: "",
        comments: [],
        className:"",
        isPlaying:false,
        mvUrl: ""
    },
    methods:{
        searchMusic: function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+that.query)
            .then(function(response){
                that.musicList = response.data.result.songs;
                // console.log(response.data.result.songs);
            })
            .catch(function(err){
                console.log(err);
            })
        },
        playMusic: function(musicId){
            // console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(
                function(response){
                    // console.log(response.data.data[0].url);
                    that.musicUrl = response.data.data[0].url;
                },
                function(err){
                    console.log(err);
                }
            )

            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(
                function(response){
                    // console.log(response.data.songs[0].al.picUrl);
                    that.picUrl = response.data.songs[0].al.picUrl;
                }
            )

            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(
                function(response){
                    // console.log(response.data.hotComments);
                    that.comments = response.data.hotComments;
                }
            )
        },
        play: function(){
            this.isPlaying=true;
        },
        pause: function(){
            this.isPlaying=false;
        },

        playMV: function(mvid){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(response){
                // console.log(response.data.data.url);
                that.mvUrl=response.data.data.url;
            })
        },
        pausemv: function(){
            this.mvUrl="";
        }
    }
})