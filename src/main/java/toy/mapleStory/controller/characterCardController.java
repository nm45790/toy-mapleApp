package toy.mapleStory.controller;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import toy.mapleStory.service.characterCardService;
import toy.mapleStory.service.searchMapper;
import toy.mapleStory.vo.checkVO;

import java.io.*;

@CrossOrigin(origins="*", allowedHeaders="*") /* CORS 어노테이션 */
@RestController
public class characterCardController {
//    @Autowired
//    private characterCardService characterCardService;

    @Autowired
    searchMapper searchMapper;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/tmp")
    public void t(){
        log.info("info !!");
    }

    @GetMapping("/test")
//    public void s(@RequestParam(value="id", required=false) String id) throws IOException, ParseException {
    public void s() throws IOException, ParseException {
        log.info("img !!");
        JSONObject j = new JSONObject();

        String w = System.getProperty("user.dir");
        log.info(w);
        log.info(w.substring(0,1));

        if(w.substring(0,1).equals("C")){
            log.info("크하하하");
        }
        else{
            log.info("쿠후후후");
        }
    }

    @GetMapping("/api/getJsonTest")
    public JSONObject jsonTest(){
        JSONObject j1 = new JSONObject();
        JSONObject j2 = new JSONObject();

        j1.put("a", "1");
        j1.put("b", "2");
        j1.put("c", "3");

        j2.put("A", j1);

        return j2;
    }

    @GetMapping("/api/getMapleBasicInfo")
    public String searchInfo(@RequestParam(value="id", required=false) String id) throws IOException, InterruptedException, ParseException {
        log.info("idCheck !!" + id);
        JSONObject j = new JSONObject();

        int cnt = 0;
        log.info(id + " ---> " + cnt);

        String filePath = System.getProperty("user.dir")+File.separator+"data"+File.separator+id+".json";

        File f = new File(filePath);
        if(f.exists()){
            log.info("o");
            Reader reader = new FileReader(filePath);

            JSONParser parser = new JSONParser();
            j = (JSONObject) parser.parse(reader);
        }
        else{
            log.info("x");
            characterCardService characterCardService = new characterCardService();

            /**************************************************************************************************************
             채워지는 값
             이름(id), 캐릭터 이미지(img), 직업(job), 레벨(lv), 경험치(exp), 인기도(famous), 길드(guild), 기본정보 링크(detailLink)
             메소(mapleMoney), 메이플포인트(maplePoint),
             스탯공격력(statAttack), HP(statHp), MP(statMp), STR(statStr), DEX(statDex), INT(statInt), LUK(statLuk),
             크리티컬데미지(criticalDamage), 보스공격력(bossAttack), 방어율무시(defenseIgnore), 상태이상내성(stateResistance),
             스탠스(stance), 방어력(defensePower), 이동속도(moveSpeed), 점프력(jumpPower), 스타포스(starForce),
             명성치(fameValue), 아케인포스(arcaneForce), 레전드리 어빌리티(ability), 하이퍼스탯(hyperStat),
             카리스마(charisma), 통찰력(insight), 의지(willPower), 손재주(dexterity), 감성(emotional), 매력(charm)
             농장이름(farmName), 농장레벨(farmLevel), 와르(farmMoney), 클로버(farmClover), 젬(farmGem)
             랭킹정보 링크(rankLink), 장비정보 링크(equipLink), 펫정보 링크(petLink)
             **************************************************************************************************************/
            characterCardService.settings();
            j = characterCardService.getUserInfo(id);
            characterCardService.close();

            /* file save */
            characterCardService.saveBinFile(id, j);
            Thread.sleep(2000);

        }

        log.info(j.toString());

        return j.toString();
    }
}
