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
                },
                {
                    "id": 299,
                    "no": "6",
                    "name": null,
                    "materialId": 200,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo6.jpg",
                    "answer": "H",
                    "rightCount": 551,
                    "wrongCount": 3299,
                    "mostErrorOption": "K",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: The total number of edges on the shapes in each row and column is equal to ten. \nRule 2: From left to right, every second shape is shaded. This pattern continues onto the next row. \"",
                    "optionDTOList": [
                        {
                            "id": 1272,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1273,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1274,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1275,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1276,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1277,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1278,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1279,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1280,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1281,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1282,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1283,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 300,
                    "no": "7",
                    "name": null,
                    "materialId": 201,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo7.jpg",
                    "answer": "C",
                    "rightCount": 1828,
                    "wrongCount": 2022,
                    "mostErrorOption": "K",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From left to right, the notches move one place clockwise around the box. This pattern continues onto the next row. \nRule 2: The number of notches is equal to the total number of edges on the shape in that box. \"",
                    "optionDTOList": [
                        {
                            "id": 1284,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1285,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1286,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1287,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1288,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1289,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1290,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1291,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1292,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1293,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1294,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1295,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 301,
                    "no": "8",
                    "name": null,
                    "materialId": 202,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo8.jpg",
                    "answer": "H",
                    "rightCount": 2056,
                    "wrongCount": 1794,
                    "mostErrorOption": "C",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From top to bottom, the shaded segment of the outer ring moves two places clockwise each time. \nRule 2: From left to right, the shaded segment of the inner ring moves one place clockwise each time. \"",
                    "optionDTOList": [
                        {
                            "id": 1296,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1297,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1298,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1299,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1300,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1301,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1302,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1303,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1304,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1305,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1306,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1307,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 302,
                    "no": "9",
                    "name": null,
                    "materialId": 203,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo9.jpg",
                    "answer": "D",
                    "rightCount": 2002,
                    "wrongCount": 1848,
                    "mostErrorOption": "K",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From top to bottom, the symbol moves one place clockwise each time. This pattern continues onto the next column. \nRule 2: From left to right, the symbol rotates 45° counterclockwise each time. This pattern continues onto the next row. \"",
                    "optionDTOList": [
                        {
                            "id": 1308,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1309,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1310,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1311,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1312,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1313,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1314,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1315,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1316,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1317,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1318,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1319,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 303,
                    "no": "10",
                    "name": null,
                    "materialId": 204,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo10.jpg",
                    "answer": "E",
                    "rightCount": 1997,
                    "wrongCount": 1853,
                    "mostErrorOption": "D",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From left to right, the right hand shape rotates 90° counterclockwise each time. This pattern continues onto the next row. \nRule 2: The left hand shape rotates 90° counterclockwise every time the pattern moves onto a new row. \"",
                    "optionDTOList": [
                        {
                            "id": 1320,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1321,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1322,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1323,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1324,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1325,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1326,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1327,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1328,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1329,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1330,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1331,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 304,
                    "no": "11",
                    "name": null,
                    "materialId": 205,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo11.jpg",
                    "answer": "I",
                    "rightCount": 2689,
                    "wrongCount": 1161,
                    "mostErrorOption": "J",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From top to bottom, the symbol rotates 45° counterclockwise each time. This pattern continues onto the next column. \nRule 2: From top to bottom, the thickened line moves down one place each time, with respect to the initial orientation of the symbol. \"",
                    "optionDTOList": [
                        {
                            "id": 1332,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1333,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1334,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1335,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1336,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1337,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1338,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1339,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1340,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1341,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1342,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1343,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 305,
                    "no": "12",
                    "name": null,
                    "materialId": 206,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo12.jpg",
                    "answer": "C",
                    "rightCount": 1315,
                    "wrongCount": 2535,
                    "mostErrorOption": "G",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From top to bottom the final pillar of one box is the first pillar of the next box. This pattern continues onto the next column. \nRule 2: From top to bottom, the remaining pillars move two places to the right each time, ignoring the first position. This pattern continues onto the next column. \"",
                    "optionDTOList": [
                        {
                            "id": 1344,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1345,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1346,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1347,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1348,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1349,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1350,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1351,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1352,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1353,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1354,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1355,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 306,
                    "no": "13",
                    "name": null,
                    "materialId": 207,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo13.jpg",
                    "answer": "G",
                    "rightCount": 2147,
                    "wrongCount": 1703,
                    "mostErrorOption": "A",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From left to right, the line moves one place counterclockwise each time. This pattern continues onto the next row. \nRule 2: From top to bottom the line alternates between being in front of and behind the shape. \"",
                    "optionDTOList": [
                        {
                            "id": 1356,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1357,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1358,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1359,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1360,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1361,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1362,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1363,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1364,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1365,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1366,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1367,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 307,
                    "no": "14",
                    "name": null,
                    "materialId": 208,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo14.jpg",
                    "answer": "H",
                    "rightCount": 2281,
                    "wrongCount": 1569,
                    "mostErrorOption": "B",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From left to right, the symbol rotates 90° counterclockwise each time. This pattern continues onto the next row. \nRule 2: An extra bar is shaded for every new row that the symbol moves onto. \"",
                    "optionDTOList": [
                        {
                            "id": 1368,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1369,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1370,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1371,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1372,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1373,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1374,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1375,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1376,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1377,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1378,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1379,
                            "tag": "L",
                            "content": ""
                        }
                    ],
                    "collectionId": null
                },
                {
                    "id": 308,
                    "no": "15",
                    "name": null,
                    "materialId": 209,
                    "materialType": 2,
                    "materialContent": "/upload/written-test/sidalo_tao1_lo15.jpg",
                    "answer": "C",
                    "rightCount": 723,
                    "wrongCount": 3127,
                    "mostErrorOption": "J",
                    "question": "What replaces the question mark?",
                    "analysis": "\"Rule 1: From top to bottom, the total number of edges on the shape(s) increases by one each time. This pattern continues onto the next column. \nRule 2: From left to right, every alternate shape is shaded. This pattern continues onto the next row. \"",
                    "optionDTOList": [
                        {
                            "id": 1380,
                            "tag": "A",
                            "content": ""
                        },
                        {
                            "id": 1381,
                            "tag": "B",
                            "content": ""
                        },
                        {
                            "id": 1382,
                            "tag": "C",
                            "content": ""
                        },
                        {
                            "id": 1383,
                            "tag": "D",
                            "content": ""
                        },
                        {
                            "id": 1384,
                            "tag": "E",
                            "content": ""
                        },
                        {
                            "id": 1385,
                            "tag": "F",
                            "content": ""
                        },
                        {
                            "id": 1386,
                            "tag": "G",
                            "content": ""
                        },
                        {
                            "id": 1387,
                            "tag": "H",
                            "content": ""
                        },
                        {
                            "id": 1388,
                            "tag": "I",
                            "content": ""
                        },
                        {
                            "id": 1389,
                            "tag": "J",
                            "content": ""
                        },
                        {
                            "id": 1390,
                            "tag": "K",
                            "content": ""
                        },
                        {
                            "id": 1391,
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