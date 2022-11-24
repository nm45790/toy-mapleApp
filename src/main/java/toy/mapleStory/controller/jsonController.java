package toy.mapleStory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import toy.mapleStory.service.searchInfoService;
import toy.mapleStory.vo.checkVO;
import toy.mapleStory.vo.searchVO;
import toy.mapleStory.service.searchMapper;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.*;

@CrossOrigin(origins="*", allowedHeaders="*") /* CORS 어노테이션 */
@RestController
public class jsonController {

    @Autowired
    private searchInfoService searchService;

    @Autowired
    searchMapper searchMapper;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/api/addQueue")
    public String addQueue(@RequestParam(value = "id", required = false) String id) throws IOException, InterruptedException{

        System.out.println(id);
        Thread.sleep(3000);

        String newId = id+":";
        return newId;
    }

    @GetMapping("/api/searchInfo")
    public String searchInfo(@RequestParam(value="id", required=false) String id) throws IOException, InterruptedException, ParseException {
        System.out.println(id + "요청 도착");

        JSONObject j = new JSONObject();
        ObjectMapper mapper = new ObjectMapper();
        int cnt = searchMapper.checkId(id);

        System.out.println("idCheck");
        System.out.println(id + " ---> " + cnt);

        if (cnt == 1){
            String filePath = "data/"+id+".json";
            Reader reader = new FileReader(filePath);

            JSONParser parser = new JSONParser();
            j = (JSONObject) parser.parse(reader);
            System.out.println(j);
        }
        else if (cnt == 0){ // &
            /* insert new id info -> id, chkState=1 */
            checkVO checkVO = new checkVO();
            checkVO.setName(id);
            checkVO.setChk(1);
            searchMapper.insertData(checkVO);

            // 검색 캐릭터 이름, 직업, 레벨, 경험치, 인기도, 길드 정보
            searchVO characterInfo = searchService._infoList(id);
            Thread.sleep(2000);

            // 검색 캐릭터 메소, 인벤토리 / 창고 링크
            searchService._subInfoList(characterInfo);
            Thread.sleep(2000);

            if (characterInfo.getChk().equals("n")){
                j.put("characterInfo", "-");
                j.put("totalMoney", "-");
                j.put("itemMapList", "-");
                j.put("storageMoney", "-");
            }
            else if(characterInfo.getChk().equals("y")){
                // 검색 캐릭터 메소 합
                Long totalMoney = searchService._calcTotalMoney(characterInfo);
                Thread.sleep(2000);

                // 검색 캐릭터 인벤토리
                List<JSONObject> itemMapList = searchService._itemInfoList(characterInfo);
                Thread.sleep(2000);

                // 검색 캐릭터 창고 메소
                String storageMoney = searchService._getStorageMoney(characterInfo);
                Thread.sleep(2000);

                j.put("chk", characterInfo.getChk());
                j.put("img", characterInfo.getImg());
                j.put("name", characterInfo.getId());
                j.put("job", characterInfo.getJob());
                j.put("lv", characterInfo.getLv());
                j.put("exp", characterInfo.getExp());
                j.put("fame", characterInfo.getFamous());
                j.put("guild", characterInfo.getGuild());
                j.put("mapleMoney", characterInfo.getMapleMoney());
                j.put("totalMoney", totalMoney.toString());
                j.put("equip", itemMapList.get(0));
                j.put("use", itemMapList.get(1));
                j.put("etc", itemMapList.get(2));
                j.put("setup", itemMapList.get(3));
                j.put("cash", itemMapList.get(4));
                j.put("storageMoney", storageMoney);

                System.out.println(j);

                /* file save */
                searchService.saveBinFile(id, j);
                Thread.sleep(2000);

                /* update id info -> chkState = 0 */
                checkVO.setChk(0);
                searchMapper.updateData(checkVO);
            }
        }
        System.out.println(id+": ok and wait...");
//        Thread.sleep(5000);

        return j.toString();
    }
}

