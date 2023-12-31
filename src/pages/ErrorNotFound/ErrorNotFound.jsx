import React from 'react';
import classes from './ErrorNotFound.module.css'
import { Link } from 'react-router-dom';

const ErrorNotFound = () => {
    return (
        <div className={classes.error_container}>
            <Link to='/'>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="626.000000pt" height="626.000000pt" viewBox="0 0 626.000000 626.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,626.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M1590 4859 c-62 -26 -110 -104 -142 -229 -37 -146 -34 -551 6 -800 8
                -47 22 -125 31 -175 23 -116 23 -114 -15 -220 -18 -49 -36 -103 -40 -120 -5
                -16 -16 -55 -25 -85 -40 -134 -91 -349 -110 -465 -4 -22 -9 -43 -11 -46 -2 -4
                -34 0 -71 9 -89 21 -395 23 -471 3 -81 -20 -61 -36 39 -31 134 8 297 1 384
                -16 121 -23 115 -20 115 -69 0 -24 7 -96 15 -160 9 -64 13 -120 11 -124 -3 -5
                -31 -11 -63 -14 -32 -3 -92 -17 -133 -31 -41 -13 -97 -27 -125 -30 -336 -39
                -639 -101 -790 -161 -237 -95 -232 -213 12 -305 109 -41 340 -95 518 -120 44
                -6 107 -15 140 -21 33 -5 101 -14 150 -19 214 -22 225 -25 225 -60 0 -29 67
                -88 113 -100 23 -6 78 -25 122 -42 66 -26 98 -32 185 -35 65 -3 122 0 150 7
                25 7 92 16 150 20 121 8 168 25 225 80 l40 38 460 -9 c277 -5 635 -5 899 1
                l439 9 42 -44 c51 -52 89 -65 220 -75 55 -4 118 -12 140 -19 22 -6 83 -11 135
                -11 88 1 106 4 239 50 150 51 178 68 209 131 19 38 12 36 222 59 94 10 134 16
                325 45 102 16 121 19 280 56 260 60 385 129 385 214 0 127 -304 228 -915 305
                -49 6 -103 16 -120 22 -26 9 -167 42 -234 55 -19 3 -22 8 -17 31 3 15 11 86
                17 157 6 72 15 134 19 139 29 31 308 59 470 46 163 -12 159 19 -6 41 -105 14
                -322 6 -406 -15 -43 -10 -59 -11 -66 -3 -5 7 -14 48 -21 92 -13 77 -72 323
                -90 375 -5 14 -17 52 -26 85 -9 33 -33 108 -53 167 -34 99 -35 110 -25 155 10
                43 25 123 53 293 23 139 34 413 21 555 -14 163 -28 226 -73 315 -27 54 -41 69
                -78 88 -48 24 -107 28 -180 11 -104 -23 -312 -150 -517 -314 -45 -36 -87 -65
                -95 -65 -7 0 -46 11 -86 25 -138 47 -325 81 -522 95 -263 19 -598 -20 -824
                -97 -38 -12 -75 -23 -82 -23 -7 0 -50 31 -96 68 -136 112 -266 199 -384 258
                -101 51 -119 56 -190 60 -44 2 -90 -1 -104 -7z m190 -92 c121 -48 275 -149
                472 -310 l96 -78 39 17 c231 100 635 148 973 114 187 -19 402 -69 511 -120 25
                -11 33 -7 155 92 252 203 416 297 532 305 64 5 68 4 96 -25 42 -45 72 -100 81
                -150 44 -244 25 -658 -45 -981 l-19 -84 48 -146 c87 -264 159 -544 168 -657
                l5 -60 -106 -53 c-58 -29 -106 -57 -106 -62 0 -14 10 -11 80 22 36 17 75 36
                87 41 12 6 29 8 39 4 15 -6 16 -17 10 -94 -3 -48 -15 -116 -25 -152 l-18 -65
                -54 -3 c-30 -1 -61 -6 -69 -9 -14 -7 -24 -8 -62 -12 -10 0 -18 -5 -18 -11 0
                -6 33 -7 89 -3 57 4 90 2 95 -5 17 -28 -91 -207 -175 -289 l-54 -53 -115 -4
                c-63 -3 -140 -10 -171 -16 -131 -25 -234 -106 -278 -218 -22 -56 -27 -62 -70
                -77 -75 -27 -425 -37 -1041 -31 -519 4 -559 6 -623 25 -81 24 -93 32 -100 70
                -9 41 -61 122 -94 148 -92 68 -184 93 -358 99 l-120 4 -43 43 c-77 75 -190
                262 -178 293 5 12 23 14 96 9 52 -3 90 -2 90 4 0 12 -29 18 -122 26 -43 4 -81
                12 -86 19 -19 25 -35 106 -40 204 -6 122 -10 119 115 63 142 -64 121 -31 -24
                39 l-83 40 0 56 c0 31 4 73 10 93 5 20 23 95 40 166 38 164 132 471 161 526 5
                10 3 39 -5 70 -15 57 -61 352 -70 454 -13 131 -7 438 9 525 17 87 67 188 103
                210 29 16 114 10 172 -13z m144 -2914 c39 -9 89 -30 114 -48 95 -65 147 -187
                105 -243 -29 -39 -71 -60 -133 -68 l-55 -6 0 104 c0 74 -4 110 -14 121 -22 27
                -31 10 -26 -51 7 -80 -18 -149 -65 -177 -30 -17 -52 -20 -160 -20 -114 1 -130
                3 -182 28 -31 14 -62 35 -67 46 -15 27 -13 118 3 164 15 41 4 59 -20 35 -20
                -20 -54 -122 -54 -163 0 -43 -11 -44 -44 -4 -29 34 -31 47 -15 102 45 162 335
                247 613 180z m2772 1 c159 -41 244 -120 244 -228 0 -36 -5 -48 -26 -65 -36
                -28 -42 -27 -42 13 0 48 -11 95 -33 139 -22 41 -56 53 -45 15 37 -127 31 -179
                -24 -216 -58 -39 -132 -55 -239 -50 -160 7 -194 37 -200 179 -2 62 -7 89 -14
                86 -29 -9 -48 -158 -27 -211 9 -24 8 -26 -21 -26 -54 0 -119 22 -149 50 -52
                49 -38 138 36 220 21 23 54 50 73 60 43 21 140 48 196 54 67 7 210 -4 271 -20z"/>
                <path d="M1700 4633 c-33 -12 -61 -50 -78 -103 -14 -44 -17 -91 -16 -245 2
                -248 38 -493 79 -534 27 -27 36 -18 160 176 56 86 165 201 268 282 77 61 89
                87 57 128 -55 71 -243 207 -375 273 -61 31 -69 32 -95 23z m113 -105 c82 -47
                240 -163 277 -203 l25 -27 -60 -51 c-108 -92 -210 -202 -269 -290 -31 -48 -61
                -87 -66 -87 -36 0 -67 510 -39 628 21 86 32 89 132 30z"/>
                <path d="M4430 4598 c-163 -93 -350 -240 -365 -288 -10 -30 10 -55 93 -119
                109 -84 190 -171 260 -281 94 -146 112 -170 131 -170 24 0 38 31 56 125 41
                213 55 469 34 608 -17 107 -45 151 -105 162 -22 4 -47 -5 -104 -37z m127 -65
                c32 -76 27 -458 -9 -612 -6 -28 -14 -51 -18 -51 -4 0 -31 37 -61 83 -54 82
                -189 227 -284 304 l-50 41 25 27 c62 67 328 244 368 245 7 0 20 -17 29 -37z"/>
                <path d="M2305 3851 c-61 -16 -108 -45 -153 -98 -49 -56 -79 -120 -64 -135 8
                -8 71 12 147 47 37 16 151 46 168 44 27 -5 87 14 103 32 56 62 -86 140 -201
                110z"/>
                <path d="M3802 3844 c-56 -24 -77 -51 -73 -91 2 -20 37 -33 131 -49 53 -8 130
                -31 190 -55 54 -22 104 -38 109 -35 12 8 -4 58 -35 107 -67 108 -222 167 -322
                123z"/>
                <path d="M2341 3208 c-20 -5 -58 -33 -90 -66 -44 -45 -61 -72 -81 -127 -52
                -151 -22 -315 75 -404 162 -149 385 18 385 290 0 149 -70 270 -179 307 -40 14
                -63 14 -110 0z m179 -138 c29 -16 54 -92 46 -144 -8 -51 -41 -106 -72 -117
                -49 -18 -104 49 -104 126 0 47 30 119 57 134 23 13 49 14 73 1z"/>
                <path d="M3766 3205 c-116 -41 -193 -209 -167 -365 24 -148 105 -258 206 -281
                121 -27 215 46 261 202 23 77 15 206 -18 280 -31 69 -113 151 -166 167 -49 15
                -67 15 -116 -3z m21 -147 c34 -38 43 -64 43 -125 0 -80 -26 -123 -75 -123 -60
                0 -95 51 -95 141 0 106 72 166 127 107z"/>
                <path d="M2994 2726 c-35 -15 -64 -51 -64 -78 0 -21 72 -81 123 -101 42 -18
                44 -26 17 -84 -36 -81 -129 -107 -202 -58 -20 14 -39 34 -43 45 -8 25 -35 26
                -35 1 0 -27 40 -82 80 -109 30 -20 44 -23 99 -20 62 4 66 6 107 51 l43 47 27
                -35 c75 -99 235 -83 284 28 27 59 9 73 -33 25 -39 -45 -65 -58 -112 -58 -59 0
                -94 25 -122 86 -20 44 -22 58 -13 69 7 8 17 15 22 15 19 0 100 63 110 86 15
                31 -10 69 -58 89 -46 19 -187 19 -230 1z m175 -40 c20 -23 -40 -42 -90 -27
                -64 19 -47 37 37 40 24 1 46 -5 53 -13z"/>
                </g>
                </svg>
            </Link>

            <h1>404</h1>
            <h3>Not found</h3>
        </div>
    );
};

export default ErrorNotFound;