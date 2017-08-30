const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
    getEntryTest: function () {
        const questions = {
            'topicDTOList': [
                {
                    "id": 294,
                    "no": "1",
                    "name": null,
                    "materialId": 195,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo1.jpg",
                    "answer": "G",
                    "rightCount": 2420,
                    "wrongCount": 1430,
                    "mostErrorOption": "K",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From left to right, the square moves one place clockwise each time. This pattern continues onto the next line \nRule 2: From top to bottom, the star moves one place counterclockwise to the next corner each time. This pattern continues onto the next column. \"",
                    "optionDTOList": [
                        {
                            "id": 1212,
                            "tag": "A",
                            "content": "1"
                        },
                        {
                            "id": 1213,
                            "tag": "B",
                            "content": "1"
                        },
                        {
                            "id": 1214,
                            "tag": "C",
                            "content": "1"
                        },
                        {
                            "id": 1215,
                            "tag": "D",
                            "content": "1"
                        },
                        {
                            "id": 1216,
                            "tag": "E",
                            "content": "1"
                        },
                        {
                            "id": 1217,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1218,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1219,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1220,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1221,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1222,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1223,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 295,
                    "no": "2",
                    "name": null,
                    "materialId": 196,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo2.jpg",
                    "answer": "F",
                    "rightCount": 2247,
                    "wrongCount": 1603,
                    "mostErrorOption": "A",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From left to right, the total number of edges on the shape increases by one. \nRule 2: From top to bottom, the line moves one place counterclockwise to the next corner. This pattern repeats onto the next column. \"",
                    "optionDTOList": [
                        {
                            "id": 1224,
                            "tag": "A",
                            "content": "2"
                        },
                        {
                            "id": 1225,
                            "tag": "B",
                            "content": "2"
                        },
                        {
                            "id": 1226,
                            "tag": "C",
                            "content": "2"
                        },
                        {
                            "id": 1227,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1228,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1229,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1230,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1231,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1232,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1233,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1234,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1235,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 296,
                    "no": "3",
                    "name": null,
                    "materialId": 197,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo3.jpg",
                    "answer": "J",
                    "rightCount": 2773,
                    "wrongCount": 1077,
                    "mostErrorOption": "F",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From left to right, the symbol rotates 45°counterclockwise each time. This pattern continues onto the next row \nRule 2: Each row and column has a symbol with two shaded halves, a symbol with one shaded half and a symbol with no shaded halves. \"",
                    "optionDTOList": [
                        {
                            "id": 1236,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1237,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1238,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1239,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1240,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1241,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1242,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1243,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1244,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1245,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1246,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1247,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 297,
                    "no": "4",
                    "name": null,
                    "materialId": 198,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo4.jpg",
                    "answer": "I",
                    "rightCount": 2719,
                    "wrongCount": 1131,
                    "mostErrorOption": "J",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From top to bottom, the arrow moves counterclockwise one place around the shape each time. \nRule 2: From left to right, the shape outline alternates between shaded and unshaded. \"",
                    "optionDTOList": [
                        {
                            "id": 1248,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1249,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1250,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1251,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1252,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1253,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1254,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1255,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1256,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1257,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1258,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1259,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 298,
                    "no": "5",
                    "name": null,
                    "materialId": 199,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo5.jpg",
                    "answer": "K",
                    "rightCount": 1477,
                    "wrongCount": 2373,
                    "mostErrorOption": "D",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From left to right, the square alternates between large and small. This pattern continues onto the next row. \nRule 2: From top to bottom, the square moves clockwise one place, then two places, then three places and so on to the next corner. This pattern continues onto the next column. \"",
                    "optionDTOList": [
                        {
                            "id": 1260,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1261,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1262,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1263,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1264,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1265,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1266,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1267,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1268,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1269,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1270,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1271,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                }
            ]
        };
        return questions;
    }
};

module.exports = AnswerAction;