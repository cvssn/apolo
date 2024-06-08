const Apolo = {
    Player: {
        addEventListener: undefined,
        back: undefined,
        data: undefined,
        decreaseVolume: undefined,
        dispatchEvent: undefined,
        eventListeners: undefined,
        formatTime: undefined,
        getDuration: undefined,
        getMute: undefined,
        getProgressMs: undefined,
        getProgressPercent: undefined,
        getRepeat: undefined,
        getShuffle: undefined,
        getThumbDown: undefined,
        getThumbUp: undefined,
        getVolume: undefined,
        increaseVolume: undefined,
        isPlaying: undefined,
        next: undefined,
        pause: undefined,
        play: undefined,
        removeEventListener: undefined,
        seek: undefined,
        setMute: undefined,
        setRepeat: undefined,
        setShuffle: undefined,
        setVolume: undefined,
        skipBack: undefined,
        skipForward: undefined,
        thumbDown: undefined,
        thumbUp: undefined,
        toggleMute: undefined,
        togglePlay: undefined,
        toggleRepeat: undefined,
        toggleShuffle: undefined
    },

    addToQueue: undefined,

    BridgeAPI: undefined,

    CosmosAPI: undefined,

    getAudioData: undefined,

    LibURI: undefined,

    LiveAPI: undefined,

    LocalStorage: undefined,

    PlaybackControl: undefined,

    Queue: undefined,

    removeFromQueue: undefined,

    test: () => {
        const APOLO_METHOD = [
            "Player",
            "addToQueue",
            "BridgeAPI",
            "CosmosAPI",
            "getAudioData",
            "LibURI",
            "LiveAPI",
            "LocalStorage",
            "PlaybackControl",
            "Queue",
            "removeFromQueue",
            "showNotification"
        ];

        const PLAYER_METHOD = [
            "addEventListener",
            "back",
            "data",
            "decreaseVolume",
            "dispatchEvent",
            "eventListeners",
            "formatTime",
            "getDuration",
            "getMute",
            "getProgressMs",
            "getProgressPercent",
            "getRepeat",
            "getShuffle",
            "getThumbDown",
            "getThumbUp",
            "getVolume",
            "increaseVolume",
            "isPlaying",
            "next",
            "pause",
            "play",
            "removeEventListener",
            "seek",
            "setMute",
            "setRepeat",
            "setShuffle",
            "setVolume",
            "skipBack",
            "skipForward",
            "thumbDown",
            "thumbUp",
            "toggleMute",
            "togglePlay",
            "toggleRepeat",
            "toggleShuffle"
        ]

        let count = APOLO_METHOD.length;

        APOLO_METHOD.forEach((method) => {
            if (Apolo[method] === undefined || Apolo[method] === null) {
                console.error(`Apolo.${method} não está disponível. por favor abra um issue no repositório apolo para informar sobre isso.`)

                count--;
            }
        })

        console.log(`${count}/${APOLO_METHOD.length} métodos e objetos apolo estão ok.`)

        count = PLAYER_METHOD.length;

        PLAYER_METHOD.forEach((method) => {
            if (Apolo.Player[method] === undefined || Apolo.Player[method] === null) {
                console.error(`Apolo.Player.${method} não está disponível. por favor abra um issue no repositório apolo para informar sobre isso.`)

                count--;
            }
        })

        console.log(`${count}/${PLAYER_METHOD.length} métodos e objetos Apolo.Player estão ok.`)
    }
}

Apolo.LibURI = (function () {
    /**
     * copyright (c) 2017 spotify ab
     * 
     * encoder/decoder de base62
     */
    var Base62 = (function () {
        // alfabetos
        var HEX16 = '0123456789abcdef';
        var BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // fragmentos hexadecimais
        var HEX256 = [];

        HEX256.length = 256;

        for (var i = 0; i < 256; i++) {
            HEX256[i] = HEX16[i >> 4] + HEX16[i & 0xf];
        }

        // tabelas look-up
        var ID62 = [];

        ID62.length = 128;

        for (var i = 0; i < BASE62.length; ++i) {
            ID62[BASE62.charCodeAt(i)] = i;
        }

        var ID16 = [];

        for (var i = 0; i < 16; i++) {
            ID16[HEX16.charCodeAt(i)] = i;
        }

        for (var i = 0; i < 6; i++) {
            ID16['ABCDEF'.charCodeAt(i)] = 10 + i;
        }

        return {
            toHex: function (s) {
                if (s.length !== 22) {
                    // só é possível analisar ids base62 com comprimento == 22
                    // ids base62 inválidos levará a lixo na saída
                    return null;
                }

                // 1 / (2^32)
                var MAX_INT_INV = 2.3283064365386963e-10;

                // 2^32
                var MAX_INT = 0x100000000;

                // 62^3
                var P62_3 = 238328;

                var p0, p1, p2, p3;
                var v;

                // os primeiros 7 caracteres cabem em 2^53
                // prettier-ignore
                p0 =
                    ID62[s.charCodeAt(0)] * 56800235584 + // * 62^6
                    ID62[s.charCodeAt(1)] * 916132832 +   // * 62^5
                    ID62[s.charCodeAt(2)] * 14776336 +    // * 62^4
                    ID62[s.charCodeAt(3)] * 238328 +      // * 62^3
                    ID62[s.charCodeAt(4)] * 3844 +        // * 62^2
                    ID62[s.charCodeAt(5)] * 62 +          // * 62^1
                    ID62[s.charCodeAt(6)];                // * 62^0

                p1 = (p0 * MAX_INT_INV) | 0;
                p0 -= p1 * MAX_INT;

                // 62^10 < 2^64
                v =
                    ID62[s.charCodeAt(7)] * 3844 +
                    ID62[s.charCodeAt(8)] * 62 +
                    ID62[s.charCodeAt(9)];

                (p0 = p0 * P62_3 + v), (p0 = p0 - (v = (p0 * MAX_INT_INV) | 0) * MAX_INT);

                p1 = p1 * P62_3 + v;

                // 62^13 < 2^96
                v =
                    ID62[s.charCodeAt(10)] * 3844 +
                    ID62[s.charCodeAt(11)] * 62 +
                    ID62[s.charCodeAt(12)];

                (p0 = p0 * P62_3 + v), (p0 = p0 - (v = (p0 * MAX_INT_INV) | 0) * MAX_INT);
                (p1 = p1 * P62_3 + v), (p1 = p1 - (v = (p1 * MAX_INT_INV) | 0) * MAX_INT);

                p2 = v;

                // 62^16 < 2^96
                v =
                    ID62[s.charCodeAt(13)] * 3844 +
                    ID62[s.charCodeAt(14)] * 62 +
                    ID62[s.charCodeAt(15)];

                (p0 = p0 * P62_3 + v), (p0 = p0 - (v = (p0 * MAX_INT_INV) | 0) * MAX_INT);
                (p1 = p1 * P62_3 + v), (p1 = p1 - (v = (p1 * MAX_INT_INV) | 0) * MAX_INT);
                
                p2 = p2 * P62_3 + v;

                // 62^19 < 2^128
                v =
                    ID62[s.charCodeAt(16)] * 3844 +
                    ID62[s.charCodeAt(17)] * 62 +
                    ID62[s.charCodeAt(18)];

                (p0 = p0 * P62_3 + v), (p0 = p0 - (v = (p0 * MAX_INT_INV) | 0) * MAX_INT);
                (p1 = p1 * P62_3 + v), (p1 = p1 - (v = (p1 * MAX_INT_INV) | 0) * MAX_INT);
                (p2 = p2 * P62_3 + v), (p2 = p2 - (v = (p2 * MAX_INT_INV) | 0) * MAX_INT);
                
                p3 = v;

                v =
                    ID62[s.charCodeAt(19)] * 3844 +
                    ID62[s.charCodeAt(20)] * 62 +
                    ID62[s.charCodeAt(21)];

                (p0 = p0 * P62_3 + v), (p0 = p0 - (v = (p0 * MAX_INT_INV) | 0) * MAX_INT);
                (p1 = p1 * P62_3 + v), (p1 = p1 - (v = (p1 * MAX_INT_INV) | 0) * MAX_INT);
                (p2 = p2 * P62_3 + v), (p2 = p2 - (v = (p2 * MAX_INT_INV) | 0) * MAX_INT);
                (p3 = p3 * P62_3 + v), (p3 = p3 - (v = (p3 * MAX_INT_INV) | 0) * MAX_INT);

                if (v) {
                    // carry não é permitido
                    return null;
                }

                // prettier-ignore
                return HEX256[p3 >>> 24] + HEX256[(p3 >>> 16) & 0xFF] + HEX256[(p3 >>> 8) & 0xFF] + HEX256[(p3) & 0xFF] +
                    HEX256[p2 >>> 24] + HEX256[(p2 >>> 16) & 0xFF] + HEX256[(p2 >>> 8) & 0xFF] + HEX256[(p2) & 0xFF] +
                    HEX256[p1 >>> 24] + HEX256[(p1 >>> 16) & 0xFF] + HEX256[(p1 >>> 8) & 0xFF] + HEX256[(p1) & 0xFF] +
                    HEX256[p0 >>> 24] + HEX256[(p0 >>> 16) & 0xFF] + HEX256[(p0 >>> 8) & 0xFF] + HEX256[(p0) & 0xFF];
            },

            fromHex: function (s) {
                var i;

                var p0 = 0, p1 = 0, p2 = 0;

                for (i = 0; i < 10; i++) p2 = p2 * 16 + ID16[s.charCodeAt(i)];
                for (i = 0; i < 11; i++) p1 = p1 * 16 + ID16[s.charCodeAt(i + 10)];
                for (i = 0; i < 11; i++) p0 = p0 * 16 + ID16[s.charCodeAt(i + 21)];

                if (isNaN(p0 + p1 + p2)) {
                    return null;
                }

                var P16_11 = 17592186044416; // 16^11
                var INV_62 = 1.0 / 62;

                var acc;
                var ret = '';

                i = 0;

                for (; i < 7; ++i) {
                    acc = p2;
                    p2 = Math.floor(acc * INV_62);

                    acc = (acc - p2 * 62) * P16_11 + p1;
                    p1 = Math.floor(acc * INV_62);

                    acc = (acc - p1 * 62) * P16_11 + p0;
                    p0 = Math.floor(acc * INV_62);

                    ret = BASE62[acc - p0 * 62] + ret;
                }

                p1 += p2 * P16_11;

                for (; i < 15; ++i) {
                    acc = p1;
                    p1 = Math.floor(acc * INV_62);

                    acc = (acc - p1 * 62) * P16_11 + p0;
                    p0 = Math.floor(acc * INV_62);

                    ret = BASE62[acc - p0 * 62] + ret;
                }

                p0 += p1 * P16_11;

                for (; i < 21; ++i) {
                    acc = p0;
                    p0 = Math.floor(acc * INV_62);

                    ret = BASE62[acc - p0 * 62] + ret;
                }

                return BASE62[p0] + ret;
            },

            // expõe as tabelas look-up
            HEX256: HEX256, // número -> 'hh'
            ID16: ID16,     // código de caractere hexadecimal -> 0..15
            ID62: ID62      // código de caractere base62 -> 0..61
        };
    })();

    /**
     * o prefixo uri para os uris
     * 
     * @const
     * 
     * @private
     */
    var URI_PREFIX = 'spotify:';

    /**
     * o prefixo url para play
     * 
     * @const
     * 
     * @private
     */
    var PLAY_HTTP_PREFIX = 'http://play.spotify.com/';

    /**
     * o prefixo https url para play
     * 
     * @const
     * 
     * @private
     */
    var PLAY_HTTPS_PREFIX = 'http://play.spotify.com/';

    /**
     * o prefixo url para open
     * 
     * @const
     * 
     * @private
     */
    var OPEN_HTTP_PREFIX = 'http://open.spotify.com/';

    /**
     * o prefixo https url para open
     * 
     * @const
     * 
     * @private
     */
    var OPEN_HTTPS_PREFIX = 'http://open.spotify.com/';

    var ERROR_INVALID = new TypeError('uri de spotify inválido!');
    var ERROR_NOT_IMPLEMENTED = new TypeError('não implementado!');

    /**
     * o formato para o uri para ser analisado
     * 
     * @enum {number}
     * 
     * @private
     */
    var Format = {
        URI: 0,
        URL: 1
    };

    /**
     * representa o resultado de uma operação
     * 
     * @typedef {{
     *     format: Format,
     *     components: Array.<string>
     * }}
     * 
     * @see _splitIntoComponents
     * 
     * @private
     */
    var SplittedURI;

    /**
     * divide uma uri de string ou url http/https em componentes, ignorando o prefixo
     * 
     * @param {string} str uma uri string para ser dividida
     * 
     * @return {SplittedURI} a uri analisada
     * 
     * @private
     */
    var _splitIntoComponents = function (str) {
        var componentes;
        var format;
        var query;
        var anchor;

        var querySplit = str.split('?');

        if (querySplit.length > 1) {
            str = querySplit.shift();
            query = querySplit.pop();

            var queryHashSplit = query.split('#');

            if (queryHashSplit.length > 1) {
                query = queryHashSplit.shift();
                anchor = queryHashSplit.pop();
            }

            query = decodeQueryString(query);
        }

        var hashSplit = str.split('#');

        if (hashSplit.length > 1) {
            // primeiro token
            str = hashSplit.shift();

            // último token
            anchor = hashSplit.pop();
        }

        if (str.indexOf(URI_PREFIX) === 0) {
            components = str.slice(URI_PREFIX.length).split(':');
            format = Format.URI;
        } else {
            // para urls http, ignorar qualquer argumento de string de consulta
            str = str.split('?')[0];

            if (str.indexOf(PLAY_HTTP_PREFIX) === 0) {
                components = str.slice(PLAY_HTTP_PREFIX.length).split('/');
            } else if (str.indexOf(PLAY_HTTPS_PREFIX) === 0) {
                components = str.slice(PLAY_HTTPS_PREFIX.length).split('/');
            } else if (str.indexOf(OPEN_HTTP_PREFIX) === 0) {
                components = str.slice(OPEN_HTTP_PREFIX.length).split('/');
            } else if (str.indexOf(OPEN_HTTPS_PREFIX) === 0) {
                components = str.slice(OPEN_HTTPS_PREFIX.length).split('/');
            } else {
                throw ERROR_INVALID;
            }

            format = Format.URL;
        }

        if (anchor) {
            components.push(anchor);
        }

        return {
            format: format,
            components: components,
            query: query
        };
    };

    /**
     * codifica um componente de acordo com um formato
     * 
     * @param {string} component uma string de um componente
     * @param {Format} format um formato
     * 
     * @return {string} uma string de um componente codificado
     * 
     * @private
     */
    var _encodeComponent = function (component, format) {
        component = encodeURIComponent(component);

        if (format === Format.URI) {
            component = component.replace(/%20/g, '+');
        }

        // codifica caracteres que não estão codificados por padrão pelo encodeuricomponent
        // mas que a especificação uri do spotify codifica
        component = component.replace(/[!'()]/g, escape);
        component = component.replace(/\*/g, '%2A');

        return component;
    };

    /**
     * decodifica um componente de acordo com um formato
     * 
     * @param {string} component uma string de um componente
     * @param {Format} format um formato
     * 
     * @return {string} uma string de um componente decodificado
     * 
     * @private
     */
    var _decodeComponent = function (component, format) {
        var part = format == Format.URI ? component.replace(/\+/g, '%20') : component;
        
        return decodeURIComponent(part);
    };

    /**
     * retorna os componentes de uma uri como um array
     * 
     * @param {URI} uri uma uri
     * @param {Format} format o formato do output
     * 
     * @return {Array.<string>} um array dos componentes uri
     * 
     * @private
     */
    var _getComponents = function (uri, format) {
        var base62;

        if (uri.id) {
            base62 = uri._base62Id;
        }

        var components;
        var i;
        var len;

        switch (uri.type) {
            case URI.Type.ALBUM:
                components = [URI.Type.ALBUM, base62];

                if (uri.disc) {
                    components.push(uri.disc);
                }

                return components;

                case URI.Type.AD:
                    return [URI.Type.AD, uri._base62Id];
                    
                case URI.Type.ARTIST:
                    return [URI.Type.ARTIST, base62];

                case URI.Type.ARTIST_TOPLIST:
                    return [URI.Type.ARTIST, base62, URI.Type.TOP, uri.toplist];

                case URI.Type.DAILY_MIX:
                    return [URI.Type.DAILY_MIX, base62];

                case URI.Type.SEARCH:
                    return [URI.Type.SEARCH, _encodeComponent(uri.query, format)];

                case URI.Type.TRACK:
                    if (uri.context || uri.play) {
                        base62 += encodeQueryString({
                            context: uri.context,
                            play: uri.play
                        });
                    }

                    if (uri.anchor) {
                            base62 += '#' + uri.anchor;
                    }

                    return [URI.Type.TRACK, base62];

                case URI.Type.TRACKSET:
                    var trackIds = [];

                    for (i = 0, len = uri.tracks.length; i < len; i++) {
                        trackIds.push(uri.tracks[i]._base62Id);
                    }

                    trackIds = [trackIds.join(',')];

                    // index pode ser 0 algumas vezes (necessário para trackset)
                    if (uri.index !== null) {
                        trackIds.push('#', uri.index);
                    }

                    return [URI.Type.TRACKSET, _encodeComponent(uri.name)].concat(trackIds);

                    case URI.Type.FACEBOOK:
                        return [URI.Type.USER, URI.Type.FACEBOOK, uri.uid];

                    case URI.Type.AUDIO_FILE:
                        return [URI.Type.AUDIO_FILE, uri.extension, uri._base62Id];

                    case URI.Type.FOLDER:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.FOLDER, uri._base62Id];

                    case URI.Type.FOLLOWERS:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.FOLLOWERS];

                    case URI.Type.FOLLOWING:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.FOLLOWING];

                    case URI.Type.PLAYLIST:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.PLAYLIST, base62];

                    case URI.Type.PLAYLIST_V2:
                        return [URI.Type.PLAYLIST, base62];

                    case URI.Type.STARRED:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.STARRED];

                    case URI.Type.TEMP_PLAYLIST:
                        return [URI.Type.TEMP_PLAYLIST, uri.origin, uri.data];

                    case URI.Type.CONTEXT_GROUP:
                        return [URI.Type.CONTEXT_GROUP, uri.origin, uri.name];

                    case URI.Type.USER_TOPLIST:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.TOP, uri.toplist];

                    // toplist legacy
                    case URI.Type.USER_TOP_TRACKS:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.TOPLIST];

                    case URI.Type.TOPLIST:
                        return [URI.Type.TOP, uri.toplist].concat(uri.global ? [URI.Type.GLOBAL] : ['country', uri.country]);

                    case URI.Type.INBOX:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.INBOX];

                    case URI.Type.ROOTLIST:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.ROOTLIST];

                    case URI.Type.PUBLISHED_ROOTLIST:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.PUBLISHED_ROOTLIST];

                    case URI.Type.COLLECTION_TRACK_LIST:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.COLLECTION_TRACK_LIST, base62];

                    case URI.Type.PROFILE:
                        if (uri.args && uri.args.length > 0)
                            return [URI.Type.USER, _encodeComponent(uri.username, format)].concat(uri.args);

                        return [URI.Type.USER, _encodeComponent(uri.username, format)];

                    case URI.Type.LOCAL_ARTIST:
                        return [URI.Type.LOCAL, _encodeComponent(uri.artist, format)];

                    case URI.Type.LOCAL_ALBUM:
                        return [URI.Type.LOCAL, _encodeComponent(uri.artist, format), _encodeComponent(uri.album, format)];

                    case URI.Type.LOCAL:
                        return [URI.Type.LOCAL,

                        _encodeComponent(uri.artist, format),
                        _encodeComponent(uri.album, format),
                        _encodeComponent(uri.track, format),

                        uri.duration];

                    case URI.Type.LIBRARY:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.LIBRARY].concat(uri.category ? [uri.category] : []);

                    case URI.Type.IMAGE:
                        return [URI.Type.IMAGE, uri._base62Id];

                    case URI.Type.MOSAIC:
                        components = uri.ids.slice(0);
                        components.unshift(URI.Type.MOSAIC);

                        return components;

                    case URI.Type.RADIO:
                        return [URI.Type.RADIO, uri.args];

                    case URI.Type.SPECIAL:
                        components = [URI.Type.SPECIAL];

                        var args = uri.args || [];

                        for (i = 0, len = args.length; i < len; ++i)
                            components.push(_encodeComponent(args[i], format));

                        return components;

                    case URI.Type.STATION:
                        components = [URI.Type.STATION];

                        var args = uri.args || [];

                        for (i = 0, len = args.length; i < len; i++) {
                            components.push(_encodeComponent(args[i], format));
                        }

                        return components;

                    case URI.Type.APPLICATION:
                        components = [URI.Type.APP, uri._base62Id];

                        var args = uri.args || [];

                        for (i = 0, len = args.length; i < len; ++i)
                            components.push(_encodeComponent(args[i], format));

                        return components;

                    case URI.Type.COLLECTION_ALBUM:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.COLLECTION, URI.Type.ALBUM, base62];

                    case URI.Type.COLLECTION_MISSING_ALBUM:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.COLLECTION, URI.Type.ALBUM, base62, 'missing'];

                    case URI.Type.COLLECTION_ARTIST:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.COLLECTION, URI.Type.ARTIST, base62];

                    case URI.Type.COLLECTION:
                        return [URI.Type.USER, _encodeComponent(uri.username, format), URI.Type.COLLECTION].concat(uri.category ? [uri.category] : []);

                    case URI.Type.EPISODE:
                        if (uri.context || uri.play) {
                            base62 += encodeQueryString({
                                context: uri.context,
                                play: uri.play
                            });
                        }

                        return [URI.Type.EPISODE, base62];

                    case URI.Type.SHOW:
                        return [URI.Type.SHOW, base62];

                    case URI.Type.CONCERT:
                        return [URI.Type.CONCERT, base62];

                    default:
                        throw ERROR_INVALID;
        }
    };

    var encodeQueryString = function (values) {
        var str = '?';

        for (var i in values) {
            if (values.hasOwnProperty(i) && values[i] !== undefined) {
                if (str.length > 1) {
                    str += '&';
                }

                str += i + '=' + encodeURIComponent(values[i]);
            }
        }

        return str;
    };

    var decodeQueryString = function (str) {
        return str.split('&').reduce(function (object, pair) {
            pair = pair.split('=');
            
            object[pair[0]] = decodeURIComponent(pair[1]);

            return object;
        }, {});
    };

    /**
     * analisa os componentes de uma uri em um objeto uri real
     * 
     * @param {Array.<string>} components os componentes da uri como um array de strings
     * @param {Format} format o formato da string fonte
     * 
     * @return {URI} o objeto uri
     * 
     * @private
     */
    var _parseFromComponents = function (components, format, query) {
        var _current = 0;

        query = query || {};

        var _getNextComponent = function () {
            return components[_current++];
        };

        var _getIdComponent = function () {
            var component = _getNextComponent();

            if (component.length > 22) {
                throw new Error('id inválido');
            }

            return component;
        };

        var _getRemainingComponents = function () {
            return components.slice(_current);
        };

        var _getRemainingString = function () {
            var separator = (format == Format.URI) ? ':' : '/';

            return components.slice(_current).join(separator);
        };

        var part = _getNextComponent();

        var id;
        var i;
        var len;

        switch (part) {
            case URI.Type.ALBUM:
                return URI.albumURI(_getIdComponent(), parseInt(_getNextComponent(), 10));

            case URI.Type.AD:
                return URI.adURI(_getNextComponent());

            case URI.Type.ARTIST:
                id = _getIdComponent();

                if (_getNextComponent() == URI.Type.TOP) {
                    return URI.artistToplistURI(id, _getNextComponent());
                } else {
                    return URI.artistURI(id);
                }

            case URI.Type.AUDIO_FILE:
                return URI.audioFileURI(_getNextComponent(), _getNextComponent());

            case URI.Type.DAILY_MIX:
                return URI.dailyMixURI(_getIdComponent());

            case URI.Type.TEMP_PLAYLIST:
                return URI.temporaryPlaylistURI(_getNextComponent(), _getRemainingString());

            case URI.Type.PLAYLIST:
                return URI.playlistV2URI(_getIdComponent());

            case URI.Type.SEARCH:
                return URI.searchURI(_decodeComponent(_getRemainingString(), format));

            case URI.Type.TRACK:
                return URI.trackURI(_getIdComponent(), _getNextComponent(), query.context, query.play);

            case URI.Type.TRACKSET:
                var name = _decodeComponent(_getNextComponent());
                var tracksArray = _getNextComponent();
                var hashSign = _getNextComponent();
                var index = parseInt(_getNextComponent(), 10);

                // verificação de integridade: %23 é o código url para "#"
                if (hashSign !== '%23' || isNaN(index)) {
                    index = null;
                }

                var tracksetTracks = [];

                if (tracksArray) {
                    tracksArray = _decodeComponent(tracksArray).split(',');

                    for (i = 0, len = tracksArray.length; i < len; i++) {
                        var trackId = tracksArray[i];

                        tracksetTracks.push(URI.trackURI(trackId));
                    }
                }

                return URI.tracksetURI(tracksetTracks, name, index);

            case URI.Type.CONTEXT_GROUP:
                return URI.contextGroupURI(_getNextComponent(), _getNextComponent());

            case URI.Type.TOP:
                var type = _getNextComponent();

                if (_getNextComponent() == URI.Type.GLOBAL) {
                    return URI.toplistURI(type, null, true);
                } else {
                    return URI.toplistURI(type, _getNextComponent(), false);
                }

            case URI.Type.USER:
                var username = _decodeComponent(_getNextComponent(), format);

                var text = _getNextComponent();

                if (username == URI.Type.FACEBOOK && text != null) {
                    return URI.facebookURI(parseInt(text, 10));
                } else if (text != null) {
                    switch (text) {
                        case URI.Type.PLAYLIST:
                            return URI.playlistURI(username, _getIdComponent());

                        case URI.Type.FOLDER:
                            return URI.folderURI(username, _getIdComponent());

                        case URI.Type.COLLECTION_TRACK_LIST:
                            return URI.collectionTrackList(username, _getIdComponent());

                        case URI.Type.COLLECTION:
                            var collectionItemType = _getNextComponent();

                            switch (collectionItemType) {
                                case URI.Type.ALBUM:
                                    id = _getIdComponent();

                                    if (_getNextComponent() === 'missing') {
                                        return URI.collectionMissingAlbumURI(username, id);
                                    } else {
                                        return URI.collectionAlbumURI(username, id);
                                    }

                                case URI.Type.ARTIST:
                                    return URI.collectionArtistURI(username, _getIdComponent());

                                default:
                                    return URI.collectionURI(username, collectionItemType);
                            }

                        case URI.Type.STARRED:
                            return URI.starredURI(username);

                        case URI.Type.FOLLOWERS:
                            return URI.followersURI(username);

                        case URI.Type.FOLLOWING:
                            return URI.followingURI(username);

                        case URI.Type.TOP:
                            return URI.userToplistURI(username, _getNextComponent());

                        case URI.Type.INBOX:
                            return URI.inboxURI(username);

                        case URI.Type.ROOTLIST:
                            return URI.rootlistURI(username);

                        case URI.Type.PUBLISHED_ROOTLIST:
                            return URI.publishedRootlistURI(username);

                        case URI.Type.TOPLIST:
                            // toplist legacy
                            return URI.userTopTracksURI(username);

                        case URI.Type.LIBRARY:
                            return URI.libraryURI(username, _getNextComponent());
                    }
                }
                
                var rem = _getRemainingComponents();

                if (text != null && rem.length > 0) {
                    return URI.profileURI(username, [text].concat(rem));
                } else if (text != null) {
                    return URI.profileURI(username, [text]);
                } else {
                    return URI.profileURI(username);
                }

            case URI.Type.LOCAL:
                var artistNameComponent = _getNextComponent();
                var artistName = artistNameComponent && _decodeComponent(artistNameComponent, format);
                
                var albumNameComponent = _getNextComponent();
                var albumName = albumNameComponent && _decodeComponent(albumNameComponent, format);

                var trackNameComponent = _getNextComponent();
                var trackName = trackNameComponent && _decodeComponent(trackNameComponent, format);

                var durationComponent = _getNextComponent();
                var duration = parseInt(durationComponent, 10);

                if (trackNameComponent !== undefined) {
                    return URI.localURI(artistName, albumName, trackName, duration);
                } else if (albumNameComponent !== undefined) {
                    return URI.localAlbumURI(artistName, albumName);
                } else {
                    return URI.localArtistURI(artistName);
                }

            case URI.Type.IMAGE:
                return URI.imageURI(_getIdComponent());

            case URI.Type.MOSAIC:
                return URI.mosaicURI(components.slice(_current));

            case URI.Type.RADIO:
                return URI.radioURI(_getRemainingString());

            case URI.Type.SPECIAL:
                var args = _getRemainingComponents();

                for (i = 0, len = args.length; i < len; ++i)
                    args[i] = _decodeComponent(args[i], format);

                return URI.specialURI(args);

            case URI.Type.STATION:
                return URI.stationURI(_getRemainingComponents());

            case URI.Type.EPISODE:
                return URI.episodeURI(_getIdComponent(), query.context, query.play);

            case URI.Type.SHOW:
                return URI.showURI(_getIdComponent());

            case URI.Type.CONCERT:
                return URI.concertURI(_getIdComponent());

            case '':
                break;

            default:
                if (part === URI.Type.APP) {
                    id = _getNextComponent();
                } else {
                    id = part;
                }

                var decodeId = _decodeComponent(id, format);

                if (_encodeComponent(decodeId, format) !== id) {
                    break;
                }

                var args = _getRemainingComponents();

                for (i = 0, len = args.length; i < len; ++i)
                    args[i] = _decodeComponent(args[i], format);

                return URI.applicationURI(decodeId, args);
        }

        throw ERROR_INVALID;
    };

    /**
     * uma classe que contém informações sobre um uri
     * 
     * @constructor
     * 
     * @param {URI.Type} type
     * @param {Object} props
     */
    function URI(type, props) {
        this.type = type;

        // mescla propriedades no objeto uri
        for (var prop in props) {
            if (typeof props[prop] == 'function') {
                continue;
            }

            this[prop] = props[prop];
        }
    }

    // lazy converte o id para hexadecimal somente quando solicitado
    Object.defineProperty(URI.prototype, 'id', {
        get: function () {
            if (!this._hexId) {
                this._hexId = this._base62Id ? URI.idToHex(this._base62Id) : undefined;
            }

            return this._hexId;
        },

        set: function (id) {
            this._base62Id = id ? URI.hexToId(id) : undefined;
            this._hexId = undefined;
        },

        enumerable: true,
        configurable: true
    });

    /**
     * cria um objeto uri de aplicativo a partir do objeto uri atual
     * 
     * se o objeto uri atual já for um tipo de aplicativo, será feita uma cópia
     * 
     * @return {URI} o uri atual como um uri de aplicativo
     */
    URI.prototype.toAppType = function () {
        if (this.type == URI.Type.APPLICATION) {
            return URI.applicationURI(this.id, this.args);
        } else {
            var components = _getComponents(this, Format.URL);

            var id = components.shift();
            var len = components.length;

            if (len) {
                while (len--) {
                    components[len] = _decodeComponent(components[len], Format.URL);
                }
            }

            if (this.type == URI.Type.RADIO) {
                components = components.shift().split(':');
            }

            var result = URI.applicationURI(id, components);

            return result;
        }
    };

    /**
     * cria um objeto uri a partir de um objeto uri de aplicativo
     * 
     * se o objeto uri atual não for um tipo de aplicativo, será feita uma cópia
     * 
     * @return {URI} o uri atual como um uri digitado real
     */
    URI.prototype.toRealType = function () {
        if (this.type == URI.Type.APPLICATION) {
            return _parseFromComponents([this.id].concat(this.args), Format.URI);
        } else {
            return new URI(null, this);
        }
    };

    /**
     * retorna a representação de uri desse uri
     * 
     * @return {String} a representação uri desse uri
     */
    URI.prototype.toURI = function () {
        return URI_PREFIX + _getComponents(this, Format.URI).join(':');
    };

    /**
     * retorna uma representação de string desse uri
     * 
     * @return {String} a representação uri desse uri
     * 
     * @see {URI#toURI}
     */
    URI.prototype.toString = function () {
        return this.toURI();
    };

    /**
     * obtém o path do uri desse uri
     * 
     * @param {boolean} opt_leadingSlash true se o slash deve ser anexado
     * 
     * @return {String} o path desse uri
     */
    URI.prototype.toURLPath = function (opt_leadingSlash) {
        var components = _getComponents(this, Format.URL);

        if (components[0] === URI.Type.APP) {
            components.shift();
        }

        var isTrackset = components[0] === URI.Type.TRACKSET;
        var isLocalTrack = components[0] === URI.Type.LOCAL;

        var shouldStripEmptyComponents = !isTrackset && !isLocalTrack;

        if (shouldStripEmptyComponents) {
            var _temp = [];

            for (var i = 0, l = components.length; i < l; i++) {
                var component = components[i];

                if (!!component) {
                    _temp.push(component);
                }
            }

            components = _temp;
        }

        var path = components.join('/');

        return opt_leadingSlash ? '/' + path : path;
    };

    /**
     * retorna a string do url de reprodução para o uri
     * 
     * @return {string} a string do url de reprodução para o uri
     */
    URI.prototype.toPlayURL = function () {
        return PLAY_HTTPS_PREFIX + this.toURLPath();
    };

    /**
     * retorna a string do url para o uri
     * 
     * @return {string} a string do url para o uri
     * 
     * @see {URL#toPlayURL}
     */
    URI.prototype.toURL = function () {
        return this.toPlayURL();
    };

    /**
     * retorna a string do url aberto para o uri
     * 
     * @return {string} a string de url aberta para o uri
     */
    URI.prototype.toOpenURL = function () {
        return OPEN_HTTPS_PREFIX + this.toURLPath();
    };

    /**
     * retorna a string do url play https para o uri
     *
     * @return {string} a string do url play https para o uri
     */
    URI.prototype.toSecurePlayURL = function () {
        return this.toPlayURL();
    };

    /**
     * retorna a string do url https para o uri
     *
     * @return {string} a string do url https para o uri
     * 
     * @see {URL#toSecurePlayURL}
     */
    URI.prototype.toSecureURL = function () {
        return this.toPlayURL();
    };

    /**
     * retorna a string do url https aberto para o uri
     *
     * @return {string} a string do url https aberto para o uri
     */
    URI.prototype.toSecureOpenURL = function () {
        return this.toOpenURL();
    };

    /**
     * retorna o id do uri como uma bytestring
     *
     * @return {Array} o id do uri como uma bytestring
     */
    URI.prototype.idToByteString = function () {
        var hexId = Base62.toHex(this._base62Id);

        if (!hexId) {
            var zero = '';

            for (var i = 0; i < 16; i++) {
                zero += String.fromCharCode(0);
            }

            return zero;
        }

        var data = '';

        for (var i = 0; i < 32; i += 2) {
            var upper = Base62.ID16[hexId.charCodeAt(i)];
            var lower = Base62.ID16[hexId.charCodeAt(i + 1)];

            var byte = (upper << 4) + lower;

            data += String.fromCharCode(byte);
        }

        return data;
    };

    URI.prototype.getPath = function () {
        var uri = this.toString().replace(/[#?].*/, '');

        return uri;
    }

    URI.prototype.getBase62Id = function () {
        return this._base62Id;
    }

    /**
     * checa se dois uris se referem à mesma coisa, mesmo que não sejam necessariamente iguais
     * 
     * esses dois uris de playlist, por exemplo, referem-se à mesma playlist:
     * 
     * - spotify:user:napstersean:playlist:3vxotOnOGDlZXyzJPLFnm2
     * - spotify:playlist:3vxotOnOGDlZXyzJPLFnm2
     * 
     * @param {*} uri o uri em que a identidade será comparada com
     * 
     * @return {boolean} identidade compartilhada
     */
    URI.prototype.isSameIdentity = function (uri) {
        var uriObject = URI.from(uri);

        if (!uriObject)
            return false;

        if (this.toString() === uri.toString())
            return true;

        if (
            (this.type === URI.Type.PLAYLIST || this.type === URI.Type.PLAYLIST_V2) &&
            (uriObject.type === URI.Type.PLAYLIST || uriObject.type === URI.Type.PLAYLIST_V2)
        ) {
            return this.id === uriObject.id;
        } else if (this.type === URI.Type.STATION && uriObject.type === URI.Type.STATION) {
            var thisStationContextUriObject = _parseFromComponents(this.args, Format.URI);

            return !!thisStationContextUriObject &&
                thisStationContextUriObject.isSameIdentity(
                    _parseFromComponents(uriObject.args, Format.URI)
                );
        } else {
            return false;
        }
    }

    /**
     * os vários tipos de uri
     * 
     * observe que alguns dos tipos nesta enumeração não são tipos de uri reais, mas na verdade são partículas de uri
     * eles estão marcados assim:
     * 
     * @enum {string}
     */
    URI.Type = {
        EMPTY: 'empty',
        ALBUM: 'album',
        AD: 'ad',

        /** partícula uri; não é um uri real */
        APP: 'app',
        APPLICATION: 'application',
        ARTIST: 'artist',
        ARTIST_TOPLIST: 'artist-toplist',
        AUDIO_FILE: 'audiofile',
        COLLECTION: 'collection',
        COLLECTION_ALBUM: 'collection-album',
        COLLECTION_MISSING_ALBUM: 'collection-missing-album',
        COLLECTION_ARTIST: 'collection-artist',
        CONTEXT_GROUP: 'context-group',
        DAILY_MIX: 'dailymix',
        EPISODE: 'episode',

        /** partícula uri; não é um uri real */
        FACEBOOK: 'facebook',
        FOLDER: 'folder',
        FOLLOWERS: 'followers',
        FOLLOWING: 'following',

        /** partícula uri; não é um uri real */
        GLOBAL: 'global',
        IMAGE: 'image',
        INBOX: 'inbox',
        LOCAL_ARTIST: 'local-artist',
        LOCAL_ALBUM: 'local-album',
        LOCAL: 'local',
        LIBRARY: 'library',
        MOSAIC: 'mosaic',
        PLAYLIST: 'playlist',

        /** apenas usado para classificação uri */
        PLAYLIST_V2: 'playlist-v2',
        PROFILE: 'profile',
        PUBLISHED_ROOTLIST: 'published-rootlist',
        RADIO: 'radio',
        ROOTLIST: 'rootlist',
        COLLECTION_TRACK_LIST: 'collectiontracklist',
        SEARCH: 'search',
        SHOW: 'show',
        CONCERT: 'concert',
        SPECIAL: 'special',
        STARRED: 'starred',
        STATION: 'station',
        TEMP_PLAYLIST: 'temp-playlist',

        /** partícula uri; não é um uri real */
        TOP: 'top',
        TOPLIST: 'toplist',
        TRACK: 'track',
        TRACKSET: 'trackset',

        /** partícula uri; não é um uri real */
        USER: 'user',
        USER_TOPLIST: 'user-toplist',
        USER_TOP_TRACKS: 'user-top-tracks',

        /** constante obsoleta. por favor, use USER_TOP_TRACKS. */
        USET_TOP_TRACKS: 'user-top-tracks'
    };

    /**
     * cria um novo objeto uri por meio de um argumento de string
     * 
     * @param {string} str a string que será analisada em um objeto uri
     * 
     * @throws TypeError se o argumento string não for um uri válido, surgirá um typeerror
     * 
     * @return {URI} o objeto de uri analisado
     */
    URI.fromString = function (str) {
        var splitted = _splitIntoComponents(str);

        return _parseFromComponents(splitted.components, splitted.format, splitted.query);
    };

    /**
     * analisa um objeto recebido em uma instância uri
     * 
     * essa função também faz não aparecer um erro como uri.fromstring, mas
     * em vez disso, simplesmente retorna nulo se não der pra analisar o valor
     * 
     * @param {*} value o valor a ser analisado
     * 
     * @return {URI?} a instância uri correspondente, ou nulo se o valor passado não for um valor válido
     */
    URI.from = function (value) {
        try {
            if (value instanceof URI) {
                return value;
            }

            if (typeof value == 'object' && value.type) {
                return new URI(null, value);
            }

            return URI.fromString(value.toString());
        } catch (e) {
            return null;
        }
    };

    /**
     * cria um novo uri por meio de um bytestring
     * 
     * @param {URI.Type} type o tipo de uri
     * @param {ByteString} idByteString o id do uri como um bytestring
     * @param {Object} opt_args argumentos opcionais para o construtor uri
     * 
     * @return {URI} o objeto uri criado
     */
    URI.fromByteString = function (type, idByteString, opt_args) {
        while (idByteString.length != 16) {
            idByteString = String.fromCharCode(0) + idByteString;
        }

        var hexId = '';

        for (var i = 0; i < idByteString.length; i++) {
            var byte = idByteString.charCodeAt(i);

            hexId += Base62.HEX256[byte];
        }

        var id = Base62.fromHex(hexId);
        var args = opt_args || {};

        args.id = id;

        return new URI(type, args);
    };

    /**
     * clona uma instância spotifyuri recebida
     * 
     * @param {URI} uri o uri a ser clonado
     * 
     * @return {URI?} uma instância do uri
     */
    URI.clone = function (uri) {
        if (!(uri instanceof URI)) {
            return null;
        }

        return new URI(null, uri);
    };

    /**
     * @deprecated
     */
    URI.getCanonical = function (username) {
        return this.getCanonical(username);
    };

    /**
     * retorna a representação canônica de um username
     * 
     * @param {string} username o username a ser codificado
     * 
     * @return {string} a representação canônica codificada do username
     */
    URI.getCanonicalUsername = function (username) {
        return _encodeComponent(username, Format.URI);
    };

    /**
     * retorna a representação não-canônica de um username
     * 
     * @param {string} username o username a ser codificado
     * 
     * @return {string} a representação canônica descodificada do username
     */
    URI.getDisplayUsername = function (username) {
        return _decodeComponent(username, Format.URI);
    };

    /**
     * retorna a representação hex de um id base62 codificado
     * 
     * @param {string} id o id base62 codificado
     * 
     * @return {string} a representação hex do id base62
     */
    URI.idToHex = function (id) {
        if (id.length == 22) {
            return Base62.toHex(id);
        }

        return id;
    };

    /**
     * cria um novo uri vazio
     * 
     * @return {URI} o uri vazio
     */
    URI.emptyURI = function () {
        return new URI(URI.Type.EMPTY, {});
    };

    /**
     * cria um novo uri tipo 'álbum'
     * 
     * @param {string} id o id do álbum
     * @param {number} disc o número disc do álbum
     * 
     * @return {URI} o uri do álbum
     */
    URI.albumURI = function (id, disc) {
        return new URI(URI.Type.ALBUM, { id: id, disc: disc });
    };

    /**
     * cria um novo uri tipo 'ad'
     * 
     * @param {string} id o id do ad
     * 
     * @return {URI} o uri do ad
     */
    URI.adURI = function (id) {
        return new URI(URI.Type.AD, { id: id });
    };

    /**
     * cria um novo uri tipo 'audiofile'
     * 
     * @param {string} extension a extensão do audiofile
     * @param {string} id o id da extensão
     * 
     * @return {URI} o uri audiofile
     */
    URI.audioFileURI = function (extension, id) {
        return new URI(URI.Type.AUDIO_FILE, { id: id, extension: extension });
    };

    /**
     * cria um novo uri tipo 'artist'
     * 
     * @param {string} id o id do artista
     * 
     * @return {URI} o uri do artista
     */
    URI.artistURI = function (id) {
        return new URI(URI.Type.ARTIST, { id: id });
    };

    /**
     * cria um novo uri do tipo 'artist-toplist'
     * 
     * @param {string} id o id do artista
     * @param {string} toplist o tipo de toplist
     * 
     * @return {URI} o uri de artist-toplist
     */
    URI.artistToplistURI = function (id, toplist) {
        return new URI(URI.Type.ARTIST_TOPLIST, { id: id, toplist: toplist });
    };

    /**
     * cria um novo uri do tipo 'dailymix'
     * 
     * @param {Array.<string>} args um array de argumentos para o dailymix
     * 
     * @return {URI} o uri dailymix
     */
    URI.dailyMixURI = function (id) {
        return new URI(URI.Type.DAILY_MIX, { id: id });
    };

    /**
     * cria um novo uri do tipo 'search'
     * 
     * @param {string} query a consulta de pesquisa não codificada
     * 
     * @return {URI} o uri search
     */
    URI.searchURI = function (query) {
        return new URI(URI.Type.SEARCH, { query: query });
    };

    /**
     * cria um novo uri do tipo 'track'
     * 
     * @param {string} id o id da música
     * @param {string} anchor o ponto da música formatado em mm:ss
     * 
     * @return {URI} o uri da música
     */
    URI.trackURI = function (id, anchor, context, play) {
        return new URI(URI.Type.TRACK, {
            id: id,
            anchor: anchor,
            context: context ? URI.fromString(context) : context,
            play: play
        });
    };

    /**
     * cria um novo uri do tipo 'trackset'
     * 
     * @param {Array.<URI>} tracks um array dos uris do tipo 'track'
     * @param {string} name o nome do trackset
     * @param {number} index o index do trackset
     * 
     * @return {URI} o uri do trackset
     */
    URI.tracksetURI = function (tracks, name, index) {
        return new URI(URI.Type.TRACKSET, {
            tracks: tracks,
            name: name || '',
            index: isNaN(index) ? null : index
        });
    };

    /**
     * cria um novo uri do tipo 'facebook'
     * 
     * @param {string} uid o id de usuário
     * 
     * @return {URI} o uri do facebook
     */
    URI.facebookURI = function (uid) {
        return new URI(URI.Type.FACEBOOK, { uid: uid });
    };

    /**
     * cria um novo uri do tipo 'followers'
     * 
     * @param {string} username o nome de usuário não-canônico
     * 
     * @return {URI} o uri de seguidores
     */
    URI.followersURI = function (username) {
        return new URI(URI.Type.FOLLOWERS, { username: username });
    };
    
    /**
     * cria um novo uri do tipo 'following'
     * 
     * @param {string} username o nome de usuário não-canônico
     * 
     * @return {URI} o uri de seguindo
     */
    URI.followingURI = function (username) {
        return new URI(URI.Type.FOLLOWING, { username: username });
    };

    /**
     * cria um novo uri do tipo 'playlist'
     * 
     * @param {string} username o nome de usuário não-canônico do dono da playlist
     * @param {string} id o id da playlist
     * 
     * @return {URI} o uri da playlist
     */
    URI.playlistURI = function (username, id) {
        return new URI(URI.Type.PLAYLIST, { username: username, id: id });
    };

    /**
     * cria um novo uri do tipo 'playlist-v2'
     * 
     * @param {string} id o id da playlist
     * 
     * @return {URI} o uri da playlist
     */
    URI.playlistV2URI = function (id) {
        return new URI(URI.Type.PLAYLIST_V2, { id: id });
    };

    /**
     * cria um novo uri do tipo 'folder'
     * 
     * @param {string} username o nome de usuário não-canônico do dono da pasta
     * @param {string} id o id da pasta
     * 
     * @return {URI} o uri da playlist
     */
    URI.folderURI = function (username, id) {
        return new URI(URI.Type.FOLDER, { username: username, id: id });
    };

    /**
     * cria um novo uri do tipo 'collectiontracklist'
     * 
     * @param {string} username o nome de usuário não-canônico do dono da coleção
     * @param {string} id o id da tracklist
     * 
     * @return {URI} o uri collectiontracklist
     */
    URI.collectionTrackList = function (username, id) {
        return new URI(URI.Type.COLLECTION_TRACK_LIST, { username: username, id: id });
    };

    /**
     * cria um novo uri do tipo 'starred'
     * 
     * @param {string} username o nome de usuário não-canônico do dono da lista de estrelas
     * 
     * @return {URI} o uri de estrelas
     */
    URI.starredURI = function (username) {
        return new URI(URI.Type.STARRED, { username: username });
    };

    /**
     * cria um novo uri do tipo 'user-toplist'
     * 
     * @param {string} username o nome de usuário não-canônico do dono da toplist
     * @param {string} toplist o tipo de toplist
     * 
     * @return {URI} o uri de user-toplist
     */
    URI.userToplistURI = function (username, toplist) {
        return new URI(URI.Type.USER_TOPLIST, { username: username, toplist: toplist });
    };

    /**
     * cria um novo uri do tipo 'user-top-tracks'
     *
     * @deprecated
     * 
     * @param {string} username o nome de usuário não-canônico do dono da toplist
     * @return {URI} o uri de user-top-tracks
     */
    URI.userTopTracksURI = function (username) {
        return new URI(URI.Type.USER_TOP_TRACKS, { username: username });
    };

    /**
     * cria um novo uri do tipo 'user-toplist'
     *
     * @param {string} toplist o tipo toplist
     * @param {string} country o código do país para a lista principal
     * @param {boolean} global verdadeiro se esta for uma lista global e não de países
     * 
     * @return {URI} o uri toplist
     */
    URI.toplistURI = function (toplist, country, global) {
        return new URI(URI.Type.TOPLIST, { toplist: toplist, country: country, global: !!global });
    };

    /**
     * cria um novo uri do tipo 'inbox'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da inbox
     * 
     * @return {URI} o uri da inbox
     */
    URI.inboxURI = function (username) {
        return new URI(URI.Type.INBOX, { username: username });
    };

    /**
     * cria um novo uri do tipo 'rootlist'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da rootlist
     * 
     * @return {URI} o uri da rootlist
     */
    URI.rootlistURI = function (username) {
        return new URI(URI.Type.ROOTLIST, { username: username });
    };

    /**
     * cria um novo uri do tipo 'published-rootlist'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da lista raiz publicada
     * 
     * @return {URI} o uri published-rootlist
     */
    URI.publishedRootlistURI = function (username) {
        return new URI(URI.Type.PUBLISHED_ROOTLIST, { username: username });
    };

    /**
     * cria um novo uri do tipo 'local-artist'
     *
     * @param {string} artist o nome do artista
     * 
     * @return {URI} o uri local-artist
     */
    URI.localArtistURI = function (artist) {
        return new URI(URI.Type.LOCAL_ARTIST, { artist: artist });
    };

    /**
     * cria um novo uri do tipo 'local-album'
     *
     * @param {string} artist o nome do artista
     * @param {string} album o nome do álbum
     * 
     * @return {URI} o uri local-album
     */
    URI.localAlbumURI = function (artist, album) {
        return new URI(URI.Type.LOCAL_ALBUM, { artist: artist, album: album });
    };

    /**
     * cria um novo uri do tipo 'local'
     *
     * @param {string} artist o nome do artista
     * @param {string} album o nome do álbum
     * @param {string} track o nome da música
     * @param {number} duration a duração da música em ms
     * 
     * @return {URI} o uri local
     */
    URI.localURI = function (artist, album, track, duration) {
        return new URI(URI.Type.LOCAL, {
            artist: artist,
            album: album,
            track: track,
            duration: duration
        });
    };

    /**
     * cria um novo uri do tipo 'library'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da rootlist
     * @param {string} category a categoria da biblioteca
     * 
     * @return {URI} o uri da biblioteca
     */
    URI.libraryURI = function (username, category) {
        return new URI(URI.Type.LIBRARY, { username: username, category: category });
    };

    /**
     * cria um novo uri do tipo 'collection'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da rootlist
     * @param {string} category a categoria da coleção
     * 
     * @return {URI} o uri da coleção
     */
    URI.collectionURI = function (username, category) {
        return new URI(URI.Type.COLLECTION, { username: username, category: category });
    };

    /**
     * cria um novo uri do tipo 'temp-playlist'
     *
     * @param {string} origin a origem da playlist temporária
     * @param {string} data data adicional para a playlist
     * 
     * @return {URI} o uri temp-playlist
     */
    URI.temporaryPlaylistURI = function (origin, data) {
        return new URI(URI.Type.TEMP_PLAYLIST, { origin: origin, data: data });
    };

    /**
     * cria um novo uri do tipo 'context-group'
     *
     * @deprecated
     * 
     * @param {string} origin a origem da playlist temporária
     * @param {string} name o nome do grupo de contexto
     * 
     * @return {URI} o uri context-group
     */
    URI.contextGroupURI = function (origin, name) {
        return new URI(URI.Type.CONTEXT_GROUP, { origin: origin, name: name });
    };

    /**
     * cria um novo uri do tipo 'profile'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da
     * @param {Array.<string>} args uma lista de argumentos
     * 
     * @return {URI} o uri do perfil
     */
    URI.profileURI = function (username, args) {
        return new URI(URI.Type.PROFILE, { username: username, args: args });
    };

    /**
     * cria um novo uri do tipo 'image'
     *
     * @param {string} id o id da imagem
     * 
     * @return {URI} o uri da imagem
     */
    URI.imageURI = function (id) {
        return new URI(URI.Type.IMAGE, { id: id });
    };

    /**
     * cria um novo uri do tipo 'mosaic'
     *
     * @param {Array.<string>} ids os ids das imagens do mosaico
     * 
     * @return {URI} o uri do mosaico
     */
    URI.mosaicURI = function (ids) {
        return new URI(URI.Type.MOSAIC, { ids: ids });
    };

    /**
     * cria um novo uri do tipo 'radio'
     *
     * @param {string} args os argumentos de seed do rádio
     * 
     * @return {URI} o uri do rádio
     */
    URI.radioURI = function (args) {
        args = typeof args === 'undefined' ? '' : args;

        return new URI(URI.Type.RADIO, { args: args });
    };

    /**
     * cria um novo uri do tipo 'special'
     *
     * @param {Array.<string>} args um array contendo os outros argumentos
     * 
     * @return {URI} o uri especial
     */
    URI.specialURI = function (args) {
        args = typeof args === 'undefined' ? [] : args;

        return new URI(URI.Type.SPECIAL, { args: args });
    };

    /**
     * cria um novo uri do tipo 'station'
     *
     * @param {Array.<string>} args um array de argumentos para a estação
     * 
     * @return {URI} o uri da estação
     */
    URI.stationURI = function (args) {
        args = typeof args === 'undefined' ? [] : args;

        return new URI(URI.Type.STATION, { args: args });
    };

    /**
     * cria um novo uri do tipo 'application'
     *
     * @param {string} id o id do aplicativo
     * @param {Array.<string>} args um array contendo os argumentos para o app
     * 
     * @return {URI} o uri do aplicativo
     */
    URI.applicationURI = function (id, args) {
        args = typeof args === 'undefined' ? [] : args;
        
        return new URI(URI.Type.APPLICATION, { id: id, args: args });
    };

    /**
     * cria um novo uri do tipo 'collection-album'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da
     * @param {string} id o id do álbum
     * 
     * @return {URI} o uri collection-album
     */
    URI.collectionAlbumURI = function (username, id) {
        return new URI(URI.Type.COLLECTION_ALBUM, { username: username, id: id });
    };

    /**
     * cria um novo uri do tipo 'collection-album-missing'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da rootlist
     * @param {string} id o id do álbum
     * 
     * @return {URI} o uri collection-album-missing
     */
    URI.collectionMissingAlbumURI = function (username, id) {
        return new URI(URI.Type.COLLECTION_MISSING_ALBUM, { username: username, id: id });
    };

    /**
     * cria um novo uri do tipo 'collection-artist'
     *
     * @param {string} username o nome de usuário não canônico do proprietário da lista raiz
     * @param {string} id o id do artista
     * 
     * @return {URI} o uri collection-artist
     */
    URI.collectionArtistURI = function (username, id) {
        return new URI(URI.Type.COLLECTION_ARTIST, { username: username, id: id });
    };

    /**
     * cria um novo uri do tipo 'episode'
     *
     * @param {string} id o id do episódio
     * @param {string} context um uri de contexto opcional
     * @param {boolean} play habilita autoplay no uri do episódio
     * 
     * @return {URI} o uri do episódio
     */
    URI.episodeURI = function (id, context, play) {
        return new URI(URI.Type.EPISODE, {
            id: id,
            context: context ? URI.fromString(context) : context,
            play: play
        });
    };

    /**
     * cria um novo uri do tipo 'show'
     *
     * @param {string} id o id do show
     * 
     * @return {URI} o uri do show
     */
    URI.showURI = function (id) {
        return new URI(URI.Type.SHOW, { id: id });
    };

    /**
     * cria um novo uri do tipo 'concert'
     *
     * @param {string} id o id do concert
     * 
     * @return {URI} o uri do concert
     */
    URI.concertURI = function (id) {
        return new URI(URI.Type.CONCERT, { id: id });
    };

    URI.isAlbum = function (uri) { return (URI.from(uri) || {}).type === URI.Type.ALBUM; };
    URI.isAd = function (uri) { return (URI.from(uri) || {}).type === URI.Type.AD; };
    URI.isApplication = function (uri) { return (URI.from(uri) || {}).type === URI.Type.APPLICATION; };
    URI.isArtist = function (uri) { return (URI.from(uri) || {}).type === URI.Type.ARTIST; };
    URI.isCollection = function (uri) { return (URI.from(uri) || {}).type === URI.Type.COLLECTION; };
    URI.isCollectionAlbum = function (uri) { return (URI.from(uri) || {}).type === URI.Type.COLLECTION_ALBUM; };
    URI.isCollectionArtist = function (uri) { return (URI.from(uri) || {}).type === URI.Type.COLLECTION_ARTIST; };
    URI.isDailyMix = function (uri) { return (URI.from(uri) || {}).type === URI.Type.DAILY_MIX; };
    URI.isEpisode = function (uri) { return (URI.from(uri) || {}).type === URI.Type.EPISODE; };
    URI.isFacebook = function (uri) { return (URI.from(uri) || {}).type === URI.Type.FACEBOOK; };
    URI.isFolder = function (uri) { return (URI.from(uri) || {}).type === URI.Type.FOLDER; };
    URI.isLocalArtist = function (uri) { return (URI.from(uri) || {}).type === URI.Type.LOCAL_ARTIST; };
    URI.isLocalAlbum = function (uri) { return (URI.from(uri) || {}).type === URI.Type.LOCAL_ALBUM; };
    URI.isLocalTrack = function (uri) { return (URI.from(uri) || {}).type === URI.Type.LOCAL; };
    URI.isMosaic = function (uri) { return (URI.from(uri) || {}).type === URI.Type.MOSAIC; };
    URI.isPlaylistV1 = function (uri) { return (URI.from(uri) || {}).type === URI.Type.PLAYLIST; };
    URI.isPlaylistV2 = function (uri) { return (URI.from(uri) || {}).type === URI.Type.PLAYLIST_V2; };
    URI.isRadio = function (uri) { return (URI.from(uri) || {}).type === URI.Type.RADIO; };
    URI.isRootlist = function (uri) { return (URI.from(uri) || {}).type === URI.Type.ROOTLIST; };
    URI.isSearch = function (uri) { return (URI.from(uri) || {}).type === URI.Type.SEARCH; };
    URI.isShow = function (uri) { return (URI.from(uri) || {}).type === URI.Type.SHOW; };
    URI.isConcert = function (uri) { return (URI.from(uri) || {}).type === URI.Type.CONCERT; };
    URI.isStation = function (uri) { return (URI.from(uri) || {}).type === URI.Type.STATION; };
    URI.isTrack = function (uri) { return (URI.from(uri) || {}).type === URI.Type.TRACK; };
    URI.isProfile = function (uri) { return (URI.from(uri) || {}).type === URI.Type.PROFILE; };
    URI.isPlaylistV1OrV2 = function (uri) { var uriObject = URI.from(uri); return !!uriObject && (uriObject.type === URI.Type.PLAYLIST || uriObject.type === URI.Type.PLAYLIST_V2); };

    /**
     * exportar interface pública
     */
    return URI;
})();

Apolo.getAudioData = (callback, uri) => {
    uri = uri || Apolo.Player.data.track.uri;

    if (typeof(callback) !== "function") {
        console.log("")

        return;
    };

    var id = Apolo.LibURI.from(uri).id;

    if (id) {
        window.cosmos.resolver.get(`hm://audio-attributes/v1/audio-analysis/${id}`, (error, payload) => {
            if (error) {
                console.log(error);

                callback(null);

                return;
            }

            if (payload._status === 200 && payload._body && payload._body !== "") {
                var data = JSON.parse(payload._body);

                data.uri = uri;

                callback(data);
            } else {
                callback(null);
            }
        })
    };
}

/**
 * configurar cosmos, bridge, api live para o objeto apolo
 */
(function findAPI() {
    if (!Apolo.CosmosAPI) {
        Apolo.CosmosAPI = window.cosmos;
    }

    if (!Apolo.BridgeAPI) {
        Apolo.BridgeAPI = window.bridge;
    }

    if (!Apolo.LiveAPI) {
        Apolo.LiveAPI = window.live;
    }

    if (!Apolo.CosmosAPI || !Apolo.BridgeAPI || !Apolo.LiveAPI) {
        setTimeout(findAPI, 1000)
    }
})();