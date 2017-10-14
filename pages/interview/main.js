import React from 'react'
import classNames from 'classnames'
import ThemeConfig from '../../config/theme'
import {Button} from 'react-weui'
import InterviewLayout from '../../containers/interview/layout'
import Card from '../../components/card'
import AxiosUtil from '../../util/axios'

const avatars = ['http://wx.qlogo.cn/mmopen/PiajxSqBRaEK8PU42LtGrcl796lUzEcOYQhdBaialhfibgj65w2IF22XmgjtCuhicZKsscyqxibXvAyjvwGCoQEd9CQ/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEr7C7iayZbBaJlicMlyshUNUJ9ZxN3DIwl7BDYic8udKCCicM9kzicBlqEI4ZtJHNVFqqRF8mrg10Ezm7VLSyy6RG7VJ/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqSTSWVyjuibwmokPrUciaAfsQgsEukwBCF3QxMDN6s2iaauFpdNnpxQJ7A7tibS36S5YeDI895mDf45j0yk1YfX1qO1/0',
  'http://wx.qlogo.cn/mmopen/GMvMVPQJkBzSf43Hjicmdz6jc1tEkPqdg6ia2LRmq6BeAHazQfxZMsztEMrQ7bicOfSbs1GhV4NGwT74WQoiaYzGVQiaM0ODNeb8q/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF4Ez0nKbws0uCQ50qGrvLPbekINJsc2JuCbS21zDxkKHUFgXXDPeSmnvBGdYaZkMzjhb8RQNQaFQ2hoFwrh3iaUg/0',
  'http://wx.qlogo.cn/mmopen/vi_32/WuViaz9JdjI8icLEYTQ6qVIMpe7ibIWiawCibcOnqO4icAfxW0qXgpQYG14iclaFnibvPMq9Jcr7XibMaxdmP72Gl22yXeQ/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEoPGtDpEqPw0cgm39rboT5C7mC1ialLDk4QGdibE56picUCzibnrp8M476d0f44J9L4u4qqwdblKJHw9DAkBdKIAcBV/0',
  'http://wx.qlogo.cn/mmopen/vi_32/uiaaXfJt7F1kQn1uTFUr70l3BVnPEJg8SK2OJpVt1Gq3l2vAleEK0ZofsdXeVbxc1DUr1IGPJuOPbxCBYQWpayg/0',
  'http://wx.qlogo.cn/mmopen/AYfn0IKjIIMlqzibRuGzuyqGicicXcPHCWD7EZb28IhZzPzIaFK51cLtW0HU5mHXGpf2PtEQWKuDRnmVSXp4VfVzNE084ibFU1jj/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqSwJN9KmAndeoh7y5uEPW5wUwssR2Kiarp49quWv3rFlqVwNn79WqHqrCQUlnYLZkcN5LOStxug7OePlibV6lvJ7A/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLRXaia2xBuruaC7b6Kvs8WIEiaBiabVMb5KAeic1LX0rhhd4GdQS0vA6XH89j3GOQDOMZZ6icIltDpJvA/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF58VhmhE42Dya8mqzvZmULKlMxAhnlHJRBGoHZGIQkhFSCJqYpTTqYcfp4JUnicZVasygR5BsWsgApbRRLUt3XBP/0',
  'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBeibibvkticNO30PThJIAx6LsHvahSE3Opibkp5B9ISgNgH8jJ84lRfr9Sy2Hx13EBk00hwwjOu6YgpQ/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF6lNRKicHibIBzaSHvUdia1MChicjQ1ibfCsqXJJyI4uz6OyyVhclpRic0XO2sib0AzNxbibIEaAWibZS3U0BfZYiaiaV7nKDI/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF5fNuFlJRgxw4YK56no5RjfEXvnsLA90CHwKIo1WaaUGtw5Z0P0DkJ184YNo8em8m0d25iaNR12je3JkcsEpr34ia/0',
  'http://wx.qlogo.cn/mmopen/vi_32/S1s1UVOwD7MECGPxGRLibmoLa8gPyLxq3adTc64OEcxUqPeJ9Luoibera4KiaZ8icllsZ759rbF2hGiaJkd7s1b2XHA/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF76A4RU0SthjicJDcNsicjVz0jaJqlVWgtQw2CiaiajVcl8yTZThYBLDh3EjlGDAcFmMrhmcqNLKFOucAm8v0G9HUdu/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqR7IhJYN6NlVu6mGGTf2o9jQzLjsiacje6Zqw9XYzj9r1LGwKFE21tS0IpU4D7vYuyMDUkP4myicmJiamPlB4Q5Cicc/0',
  'http://wx.qlogo.cn/mmopen/PiajxSqBRaEJJpBnDyhOldfewdzwLRicTicqAl1Ou0oytibkN85A63wLP3QamQoHicz5POIFRKc0XdNP5dqEicmpymow/0',
  'http://wx.qlogo.cn/mmopen/PiajxSqBRaEI0e3LLjyg7iagBviaibrlmelibB77FMAZJ3ba1nCtPjERcRibKpRYPEoiaeCXbpw5gN8iaBkQDOBz76thMw/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEoPGtDpEqPw0TpaluMUenqHbj5U9nDQ9cDJPYHV3NztMFnVoN5HM2LkEOlI4BbCfxmmSCneg1mL2G4ibQIVERO7M/0',
  'http://wx.qlogo.cn/mmopen/AYfn0IKjIIMlqzibRuGzuyuMoxASibmB0btNpp8AWRH0tAnPE4RB9Y7WbFy4v3KhvOdb5ZBvdbVZDjia1vE6X4l7nyFRFGu0BT9/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEq3u50obiaP2SIFrcs98lXGaPfFsYSCVmgOqoXzmjDibBkRmw5BHbjU86SuJlPTwWKXBd4BtRIfySIjh9kicaYicKc9/0',
  'http://wx.qlogo.cn/mmopen/vi_32/yD8JZ6OQv3plXmHMliaxf8TWY8zLNDyXxMOT9ajLNW2vp8YAC4h4cxpNMicHSgPKDqeIBXiaNsLbzrAfoTmnjBmMA/0',
  'http://wx.qlogo.cn/mmopen/FjR7vaP3GVsQMpibgicsgomJzRpABNmMiaeKDExE8JjD842MmMlou2SH8gtMZXYsXYwm7jAWfnicl2cBpH8F9tiaboDk4emT8oksX/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF58VhmhE42DyfGzt8zUsG4wZR2OPzuJeibDHjm6Y6V6hFoSqTJhXSib6NykrhWialzMabWCqUMwaUkm5z5ACITJiaav/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF58VhmhE42DyZME7NQ9Ksy9mKe2RvhTkjgdDGBG6cjtuLL71xUDRQT3IOLIup1eCyX0BfqzEiaUFXsxXM48Qt3I7/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEprZsVLLO5GflnJSKGpYQThHsBibZoichbmzJufuH2n3o2lHHtO0ibP9MOcCmA70eVsUZRIjBGsf482cQ8q5Abpuhq/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF58VhmhE42DyZPO7CkAuywhsLiahxuMnkuaTMt2DGARRcJiaPJmlBEnZLe84I1Kepx7n8uEK52Wpy7WlJZBnoldSN/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbP4FNJIkdJa7w09ggicAMs6jTvDgK2gVdE3dvWOv9EvtadNaDS9cc6kDAGQotSFPyJVIa3gkoAiaA/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF7C43HFPoS6lT6T7UoiaTk7LFNVOOd1mx9c4ibJ3VHGqaw6TenPc963y9YW3ia4KcHia728frX340Z9gjic5tXMqjMxN/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEq3u50obiaP2SCEzfXVLULXWMHZNdhibXAucgt60CfppiaZ6GtQsU9CXucbRfXibggJQRtsEymlicXT2YrCwFlD5lL0G/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqRWxSSIFbBLEF2XAIhLLib3CpQcqo9QyM2sOXsrT4Qd8YSz1m9icpXX2UEnic5l7rAnjPxQibqITwRoSNPRVxHdszCia/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Wn9aeQUa2qSJ7DXs4gOdvnMzyQ4vIJJB2XJqicH4j3OOSEJLvj2DYXTbd5tYHDKTzaUfaIGSX9IlOOzsiayCe2Vw/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF6BCmFJcs2e8fWtAXeKNZLibuHlz1haLfRJgia4iaI1ibxpRXkEsNpd6KxcczHNhRicdECBDc8y2VGnOVyT0M7PX9w6V/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF5zCsiaFuLavibpMmo5ngsCz5evnk66jdWAzLDIoJyeqxCcrQiaibyQ2HTbD2SA2lz1B1XFsQ9a817PtsvV2234VPgY/0',
  'http://wx.qlogo.cn/mmopen/ALYiayx5UVVoZlv2sGzhHjRkRTzy6uy6PvX4CqZtnWuDicxdfpjlCKQHWSeibgsRhgTHLp7WyT4MIPicaeDceryByDAwHcng0Rfib/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTILicNyHwytMnOdzup4UbiaBnzibiaj5WvoIicSyzBTDkau4o2Vu11vwT6iaZo1OmibKOSbXcDeFddIicOO2A/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJJTHDbrapwgu0DQd29CCqx7g2H6sGPH9OWSnSibUY7HWZJWcicTZaib2TrqLW4FK60pib03MU5M8A93Q/0',
  'http://wx.qlogo.cn/mmopen/AYfn0IKjIIOZMObNjUiaB5dPFkbktQxnfjNyib2p0RcSzYpPjOlUFHvXuNuf67zIAmFo2T49Y4DTwfyeJS5cFCkw/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqTowVNUILzIRk9MGkAdCD89YrP5mwSrMVLBfo6QFuwbkghhiaXzQvXhXojhicfMDXsHcAATiaBibSxBXTTs2IlpwDib0/0',
  'http://wx.qlogo.cn/mmopen/AYfn0IKjIIMlqzibRuGzuysDpryN3fcDR8MduFbXFLpFdebO4RW7aYBPmx9tfeJMIslpWWmcyQ6mCvFVwT9LfNspNOKGx9U2l/0',
  'http://wx.qlogo.cn/mmopen/AYfn0IKjIIMlqzibRuGzuypHV2pYPPVXh3uwSTibF0nAC47KEiaLiaKuhXH8BFYY2FwOK9E03Mmdpp2x4GI2RzeY7rd3yWjyzicVf/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqToMKpEibYqhiaLKgf2CBQURNFtBeIffOr3zxyiaQpGbEibxTic0eicDiajIKhCsac9q3MhJrudtn5enHVF9ibJcAG4q9ta/0',
  'http://wx.qlogo.cn/mmopen/vi_32/jP1nlib9iav7Mkqr1ibtdwDGGkMfdcib1I67O6NxVaSoMDrKMiaMrbV9PquamEgqknpmryMaCJrcPxawXiaxnEPzwXoA/0',
  'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoxq2V5KKD3OQTmGgWEbHe3FpQZyUjgPnsK9ibCiaaHzVMG5HnWnMGwVYicibj4aFPHREianhUr2xA61wA/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF5eu79Fu61gCicnImDtxhWpbyGt2K97ic48fL5lYBvtSaFHZJ01huibNkkcfMF6sAbWUBjDoINuSJuCKXn57rbf4x2/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEqvgcgHwPQWuOb6X4t7IibbG4EmEjUTFUnytFSRn0Ve0yqqeibsNTTXWUCdQqMrl85fWK8QowKze8U0LZzwWc72nG/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqTj91GJwRdnkjVPzpPKe12iaTqKOviaerhUvjDr9iavfnibVgiagCjb4TVeCNdibsOHsvgyNElGAl0iatOdnbCrJzMRiaT7/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF58VhmhE42DybyibkMAP92KXiau0gGibOR7OO5ej3JR3l3vgH3Kq6ibyh4ueamEN41AYPGKyMibiblTJLJxWZwLThMicLu/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOe0zhPv5iboqROLdPpyENElmRkmogDkfM1QVbXr9WqBtv6j22XHSBGRoVkic97sHMrAOM6hBC6oYQ/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWlSGNhxFVRia7eofDetzD1m1meJTeEaXFWgpohbqiaJrzGlkKIxgZhD8SsLhAJ149GFWXHfvz2mlA/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJz0h7EictWaicWw7ye469PYyoFicavUbuuhfuBzZicHyo7icGG3h6TR7lwuqdicF6DUqLBxCS8s6ur0RfQ/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJzbJVmxGQDPFaLcpYKfb2mpdratUByopY5xcqlJibib6YLax4DlMbPaYOkz6cXicbCISvWwianAwpGbw/0',
  'http://wx.qlogo.cn/mmopen/vi_32/YC0iaZQ79n13GjicQNvH2yH5rz3N1Us8B67Y8WGcRYYSxOicmH1s54kqrftMxIMtStibEyFkHtHaDZqrtrKovaQbwg/0',
  'http://wx.qlogo.cn/mmopen/vi_32/YbgwGR9Upw5mD8xsxPLN9vkxQe1zJXUZ1q79Te5niaR8ic1HeApuLWibiauMf1k17EJsbomBicFGq57sIc4FyC1hoIQ/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIVEFEgc4w9JoJAMEc3jCzfXXoCwDKeSxXmPT7XswEO4EduRyyCSJtH10tnbzXiadADTyrktE2DA9A/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKceXI433sunibhfenrxgMgMTm2ibdZfwDibffQJhian1dAW5l792Cp60XVa1NP1uXOhQlJYjo6YobZ6A/0',
  'http://wx.qlogo.cn/mmopen/vi_32/TAtZm3FVrpzPUHibUva3lhEkbq26AQlHsPGvLFaOzqBI44tOCTqyI7oEBDvz1GnibqGn2OoJu5aEtyz8U0EOk3XA/0',
  'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqGsibZoCvZkSibxgRnl1CibqshLC7q1m5t1SibWic2vNFJ94SgqHzWibRd4BBDnZ6uWGnicQWClFR8NEvEg/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLnKeh9BfZhsZp8qQticPYSQYSbYVva9T8f4JwJMmfSpqP9hqcpTnfWPvPxc5akyZ5faVjlVJqzf2w/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbicwOP0MBgecySqsaVyMhh5BMSicu3Vic2SqhDU2ichS0G10rTTy6NGPUv6ViazkglibQZlHogyHZG3ew/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIUBxyYZDdicetV6F1TnDxRsLo6uKFf36lmib7SBlWjqOa4HlDJORTkpUXToMtUgAImselL7Xg2PA6w/0',
  'http://wx.qlogo.cn/mmopen/w1qXcYLXEH1mJhevibzEY51MhoiancUBa4wTMjexg1LWOKBTINUic0Wdq2uSKojo70UWZZibzTG1ubCAYQbwgZKu7w9G8eVCQ1P6/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI5Ouxpq8b9Q7dFUOkkfLdpIuFZooNjMvjIokKqm8teAf9vhTg1LcIJRiccoRzhR8b0uibQLWhsEsEA/0',
  'http://wx.qlogo.cn/mmopen/AYfn0IKjIIO38UsGKBhrvrrAibE6ziaALQiaZrMx5dpvo4UwvZXe3lSAfAVPCxaq8MibFxqq7Ijb3D5UrTibygHia07g/0',
  'http://wx.qlogo.cn/mmopen/vi_32/WPtGnofABQibSo0riajCMPoju5ym4ED6WYZdtESbq7IGMoibzYjjV6ibjWoPMCGWBpwV7iceficPkkyrQ8maF3ME0KGw/0',
  'http://wx.qlogo.cn/mmopen/vi_32/c8xgay6glKR6WgIicgMGIZq0MDkNsVPdBzYjpq1Jgr0PrL5GVZsQyPEU141PWfyl0IRT2JBicGR0AEKLqDhZcTxg/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKVCcZYrltAznStYQ7qseOOJzmJ4whC6ukyibGPWBkVn5CnYgVZAJxKDafDXe9J2FicYhldiaraw55yQ/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF58VhmhE42DyTpNlm0qOnLicLfyUenao7YAgqdxnickppFPsJVjgLMiapmBBZGnTo5wkoThO60DRfbuUCCGbic3iadRB/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqRBTRf9NqTJxOK3iauibx21jgia6s3ib3Fr6cdUicjY3KENkmG52pJjAoia7UWyTKylHJnRujp45TQcSyHYIkicEPRTIrF/0',
  'http://wx.qlogo.cn/mmopen/vi_32/GtTrFH6EM94otlhUfyS5r0micC988O6uCzvP27IcsKfsSnqeSr7BibfhTmEDKQtoXlbTOich2k7JhQSTEIC2dicCoA/0',
  'http://wx.qlogo.cn/mmopen/GMvMVPQJkBzSf43Hjicmdz9DKUJOCibUTlAaLhWPQibhSVEicXo28dh4Q4w0Y0x19RqObibIHv9D9O967jAO09xDG5hPxTbHCdvJW/0',
  'http://wx.qlogo.cn/mmopen/vi_32/ibKYWs0QPdsN79xRpfibL8MzmewWNqUwEF4SE5eiapdXjSlrfGvzib7QJSBmtZEETY8upIFXlWj99yDWiaGX4kz5Dtw/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF58VhmhE42DyWlkvQ5k4FT0fdSg6iavVlxkq0ksssKYK3Kk0EeCgnRmDGZy9SgBHNE27eJuFd11ia15P2oH8ePMfZ/0',
  'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83er10PIGJLOxgXdnfZwnm3fQmvXoz8dCwlEegmWvN50J0UgrWBkDg7UoHvPpBC7icmbFJ85ZcQX5qPw/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF7LI5FlU22X4oTlU5Z3icdBhzgKBF1Kvjn0CxT2nTbibeNYzLWmdh1bC8YaCicks2w4esCSnibEZrxzUdm27DiaxGnrt/0',
  'http://wx.qlogo.cn/mmopen/AYfn0IKjIIPegBlUXvF3XrqJpKovMnBoDslPgZW31rf0txKETAHib6Oh0gcvmCOHQibuINYNCqPUxYJe0r5tf4I7JNHD07u1yb/0',
  'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBQEaX8q4tU8ImOMy6Wvwia2F1LappZhBUrp7MvaDUNmkXoCJuLVbYyld0iazGOcqs8BGjsgTb5UbbQ/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqQdG9hJnFv1M7ebmqXUUxia4yatncpCIWEcBL95F66s188eicySwCiaJdr88UfyT3YdtT8TL7SUPaaicnaCtyQZ1HcQ/0',
  'http://wx.qlogo.cn/mmopen/vi_32/xRjgiaD8vznHtkDFQ57XR1GPBtNgL4JpXNtiagSFHxdTXMwicqO0NMzxxxUWMatkJq7jQic7sjPqzCanOv9nQd1lfw/0',
  'http://wx.qlogo.cn/mmopen/Q3auHgzwzM6nOf2WSu7UoX3zgZLjzO2j6t9WziauACSM5gv9pPmyZmXmZZQVpwp8h6DNLQoiaSwniatWEepBasdibg/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI732yMt3JgXviaBlQtecmfjazgYniaRjjRC3qNQCEvHXyfVbPpfMvYPd7dDf4bx8C2uloFLI3UqSiaw/0',
  'http://wx.qlogo.cn/mmopen/gA8qJg2iaJqTaianXV9yhiaNzwW6jqp1ib1bYKR3MZ1cpkWv0p8sPVz35q4f80vX5WA9OYxE7J2KoKj7iabDPCtB1lMb5ZWaWibZQK/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF7xcfIu8O0WgLmlT5dtApTuibsOaRzVlAwBXQJcl2wRU3fwJibjceFhoZhdTUCsqicfkJnDkCIjicBAoyumCSib2coic6/0',
  'http://wx.qlogo.cn/mmopen/vi_32/W07NbpGsiby8hItpkETH3BNwsu0NzcnZvQEkLXIvXt1nxxCR84W19WTY22picn5ozgNXjw1rXUj8VeXDr79cicJ7g/0',
  'http://wx.qlogo.cn/mmopen/0CbjSNKoZF58VhmhE42DyRzKj5LHhj4dPgvozylePEq4ZLkMOxibUbTqmRNIwWPaCISwmZ02jDCDmHGk8yP6awpoCwwoicBaFd/0',
  'http://wx.qlogo.cn/mmopen/vi_32/6xicOZpw6ZeGS7bAMAqIoHLDmCBcInAu20qb0PD0KicHQsaJvvTbpelNXB9F3OEpYQybo6POxiaN7I4hIYsGdly6A/0',
  'http://wx.qlogo.cn/mmopen/vi_32/N7vTmG6ojKmumBYmd6bJS7eib8JhFXYppzAuhA7saLAj1iaSNaicAX6PGMXa4ZospdJImgrJ8smwEBF1YrcBPicwFA/0',
  'http://wx.qlogo.cn/mmopen/AYfn0IKjIIMlqzibRuGzuyiaqrqbldjvt9pqnQgs5HgmXCJMApcODB5JY9NtfYNqVgBAGPL2xQkRibRgSFXrwTZ6daQjEFAgrVn/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEq3u50obiaP2SNdRB9w4NEGiaAYUWYibbp5NAY1wcfZh6MzicuSeRCprSbFUWgvh0YMSMXnwcicsd4X4jWcyZfDxgIjD/0',
  'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erVmkibLKaBFxT3B8dhyFZHOOJFIPpiba5WvwhxUwYicBztq8u0ArcxU4w0k7UzIlPf196KLqWAabToQ/0',
  'http://wx.qlogo.cn/mmopen/PiajxSqBRaEKPIATrAW1q7DvbOooL10JKBNyTmg1D4UShibyB1OO3Ga131X5sVzMkwGCg94tlib3cNEkGISszIuBw/0',
  'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erqApDIca2Z1pFF6WuFvxxzibo9xJaBCOTM7uWPJXuMUSQMpXn5GPw3pEy5HbWlAQibG7WebANjiaSNw/0',
  'http://wx.qlogo.cn/mmopen/ajNVdqHZLLCBLkiaGEvKpl1icUmGFeXAp0VReOtdVuN8glViaFk1PLLsNFMeaXZzh17Ro4wpZ7Yz3hryFgmoj1M6w/0',
  'http://wx.qlogo.cn/mmopen/MvUFlhLMDEq3u50obiaP2SDwicicIJmMd1QuUZuATGChib4WduicwZXicY57Wok9viapTfl0Ocn85eFhibxFvh6ggkBFIDnyvXibEY6wW/0',
  'http://wx.qlogo.cn/mmopen/vi_32/3iaibRP7eiayHBWTJwWSApO8g9YNPHSQy10rdfycf2qQLXfgcD3hVia8LR5heVGkjdppsP4dILGS3XichHFtGMYOPQg/0',
  'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI0ITKRibWJKnDubfz4jfbGR6ichg7v1DM5bLOMYDIPiaibQSC7qXXnticVTEMPYZibfqpDHOk9J2q4tiaGQ/0',
  'http://wx.qlogo.cn/mmopen/vi_32/g7l7gOUVX8brZx88C5X5W8DV5LLqFaPqfaErfL7KlweAIgXn5eAexcicNeBesd7MrEURONd01yoy8Dic9g7PUrbQ/0',
  'http://wx.qlogo.cn/mmopen/vi_32/BqDzzbh5JhJY3wajZhOMIfOmlQXSvLnncLG9zMVlr2mLQrwNiclozqFNB6z47cgbTdiclAEDmYgxvia5BqhamVr6A/0'
]

export default class extends React.Component {
  constructor (props) {
    super(props)
    let set = new Set()
    while (set.size < 5) {
      set.add(Math.round(99 * Math.random()))
    }
    let randomAvatars = [...set]

    this.state = {
      randomAvatars: randomAvatars,
      isRender: true,
      mainintro: '',
      error: ''
    }
  }

  componentDidMount = async () => {
    try {
      let mainintro = await AxiosUtil({
        method: 'get',
        url: '/api/interview/getList'
      })
      this.setState({mainintro: mainintro, isRender: false})
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  renderAvatar () {
    const {randomAvatars} = this.state
    return randomAvatars.map((item, index) => {
      return <img key={item} src={avatars[item]}/>
    })
  }

  renderTop (mainintro) {
    if (mainintro) {
      let title
      const {day, interviewListDetailDTOList} = mainintro
      interviewListDetailDTOList.map((item, index) => {
        if (item.day === day) {
          title = item.title
        }
      })
      let currentDay = 10 + day - 1
      return (
        <div>
          <div className='wrapper'>
            <div className='left'>
              {day < 1 &&
                <div className='no'>群面7天打卡计划（未开始）</div>
              }
              {(day >= 1 && day <= 7) &&
                <div className='no'>第{day}天 {title}</div>
              }
              {day > 7 &&
                <div className='no'>群面7天打卡计划（已结束）</div>
              }
              <div className='time'>打卡时间：09:00 ~ 23:59:59</div>
            </div>
            <div className='right'>
              <img src='/static/img/interview/clock.png'/>
            </div>
          </div>
          <div className='join'>
            <div className='avatar'>{this.renderAvatar()}</div>
            <div className='text'>已有{mainintro.totalUserCount}人报名</div>
          </div>
          <style jsx>{`
            .wrapper {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .no {
              font-size: 1.5rem;
            }
            .right img {
              width: 3rem;
            }
            .time {
              color: ${ThemeConfig.color.font_gray}
            }
            .join {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-top: 1rem;
              font-size: 0.9rem;
              color: #2b3a64;
            }
            .join .text {
              margin-left: 1rem;
            }
          `}</style>
        </div>
      )
    }
  }

  goToList () {
    location.href = '/interview/list'
  }

  renderPrevContent (mainintro) {
    if (mainintro) {
      const {clock, day} = mainintro
      let array = [1, 2, 3, 4, 5, 6, 7]
      return array.map((item, index) => {
        let today = item === day
        let complete = clock.indexOf(item) >= 0
        let noComplete = !complete && item <= day
        return (
          <div
            key={item}
            onClick={() => {
              this.goToList()
            }}
            className={
              classNames(
                'circle',
                {
                  'today': today,
                  'complete': complete,
                  'nocomplete': noComplete
                })}>
            {item}
            <style jsx>{`
            .circle {
              width: 2.5rem;
              height: 2.5rem;
              text-align: center;
              background: #fff;
              border: 1px solid ${ThemeConfig.color.border_gray};
              border-radius: 3rem;
              line-height: 2.5rem;
            }
            .nocomplete {
              color: #fff;
              background: ${ThemeConfig.color.border_gray}
            }
            .complete {
              color: #fff;
              background: ${ThemeConfig.color.yellow}
            }
          `}</style>
          </div>
        )
      })
    }
  }

  renderCompleteUser (mainintro) {
    if (mainintro) {
      const {day, interviewListDetailDTOList} = mainintro
      let array = [1, 2, 3, 4, 5, 6, 7]
      return array.map((item, index) => {
        let today = item === day
        if (today) {
          return interviewListDetailDTOList[index].completeUser
        }
      })
    }

  }

  renderContent () {
    return (
      <div>
        <div className='before'>
          <strong>前六天</strong>：每天一项群面核心技能入门训练，将案例要点快速剖析、强化逻辑思维、商业知识认知、团队分工协作、英文表述突破、英文听力训练六大群面核心技能进行模块化拆分训练，带领大家快速学习，完成群面入门认知！
        </div>
        <div className='last'>
          <strong>第七天</strong>：<span className='important'>重要！</span>连续六天打卡且<span className='important'>正确率达到 70% 以上且答题时间最短的前500名同学</span>，<span>才能</span>最终解锁第7天线上模拟群面参与权限。
        </div>
        <div className='faq'><a href='https://shimo.im/doc/DnOFD1WodlgABtwm?r=NZOD95'><span>更多Q&A</span></a></div>
        <style jsx>{`
          .last {
            margin-top: 1rem;
          }
          .important {
            color: red;
          }
          .faq {
            margin-top: 1rem;
            text-align: right;
          }
          .faq a {
            color: ${ThemeConfig.color.font_gray};
          }
          .faq span {
            border: 1px solid ${ThemeConfig.color.border_gray};
            padding: 0.5rem;
            border-radius: 1rem;
            color: #000;
          }
        `}</style>
      </div>
    )
  }

  toLink (mainintro) {
    const {day, clock} = mainintro
    if (clock.indexOf(day) >= 0) {
      location.href = '/interview/list'
    } else {
      if (day === 1) {
        location.href = '/interview/intro?day=' + day
      } else {
        location.href = '/interview/intro?day=' + day
      }

    }
  }

  render () {
    const {isRender, mainintro, error} = this.state
    return (
      <InterviewLayout isRender={isRender} error={error}>
        <div className='header'>
          <img src='/static/img/interview/interview.png'/>
        </div>
        <div className='interview-main'>
          <div className='intro'>
            {this.renderTop(mainintro)}x`
            <div className='sub'>
              <Card
                title='小灶群面7天闪电计划(初级)'
                content={this.renderContent()}/>
            </div>
            <Button onClick={() => {
              this.toLink(mainintro)
            }}>今日打卡</Button>
            <div className='complete'>
              <div className='blank'/>
              <div className='text'>已有{this.renderCompleteUser(mainintro)}人完成</div>
              <div className='blank'/>
            </div>
            <div className='prev'>
              <div className='title'>往日打卡回顾</div>
              <div className='content'>{this.renderPrevContent(mainintro)}</div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .header img {
            width: 100%;
          }
          .interview-main {
            padding: 1rem;
          }
          .prev {
            margin: 2rem 0;
          }
          .title {
            font-weight: bold;
          }
          .content {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
          }
          .sub {
            margin-top: 2rem;
            padding: 0.5rem 0;
            border-top: 1px solid ${ThemeConfig.color.border_gray};
          }
          .complete {
            display: flex;
            justify-content: center;
            font-size: 0.9rem;
            margin-top: 1rem;
          }
          .complete .blank,
          .complete .text {
            flex: 1;
            text-align: center;
          }
          .complete .blank {
            border-top: 1px solid ${ThemeConfig.color.border_gray};
            margin-top: 0.6rem;
          }
        `}</style>
        <style global jsx>{`
          .interview {
            padding: 0 !important;
          }
          .join .avatar img {
            width: 2rem;
            border-radius: 2rem;
          }
        `}</style>
      </InterviewLayout>
    )
  }
}
