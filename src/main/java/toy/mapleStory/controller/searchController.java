package toy.mapleStory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import toy.mapleStory.service.searchInfoService;
import toy.mapleStory.vo.searchVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Locale;

@Controller
public class searchController {

    @Autowired
    private searchInfoService searchService;

    @GetMapping(value="/test.do")
    public String test(HttpServletRequest request, Locale locale, Model model){
        String browser 	 = "";
        String userAgent = request.getHeader("User-Agent");

        if(userAgent.indexOf("Trident") > -1) {												// IE
            browser = "ie";
        } else if(userAgent.indexOf("Edge") > -1) {											// Edge
            browser = "edge";
        } else if(userAgent.indexOf("Whale") > -1) { 										// Naver Whale
            browser = "whale";
        } else if(userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) { 		// Opera
            browser = "opera";
        } else if(userAgent.indexOf("Firefox") > -1) { 										 // Firefox
            browser = "firefox";
        } else if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 ) {	 // Safari
            browser = "safari";
        } else if(userAgent.indexOf("Chrome") > -1) {										 // Chrome
            browser = "chrome";
        }

        System.out.println("User-Agent : " + userAgent);
        System.out.println("Browser : " + browser);

        return "/index";
    }


    @GetMapping(value="/search.do")
    public String search(Model model){
        model.addAttribute("data", "hi~~");

        return "/search";
    }

    @PostMapping(value="/searchInfo.do")
    public String searchInfo(Model model, @RequestParam("showId") String id) throws InterruptedException {

        System.out.println("요청 도착");
        System.out.println(id);

        // 검색 캐릭터 이름, 직업, 레벨, 경험치, 인기도, 길드 정보
        List<searchVO> characterInfo = searchService.infoList(id);

        // 검색 캐릭터 메소, 인벤토리 / 창고 링크
        searchService.subInfoList(characterInfo);

        // 검색 캐릭터 메소 합
        Long totalMoney = searchService.calcTotalMoney(characterInfo);
//
//        검색 캐릭터 인벤토리
//        List<Map> itemMapList = searchService.itemInfoList(characterInfo);
//
//        검색 캐릭터 창고 메소
//        String storageMoney = searchService.getStorageMoney(characterInfo);

        model.addAttribute("characterInfo", characterInfo);
        model.addAttribute("characterInfoSize", characterInfo.size());
        model.addAttribute("characterTotalMoney", totalMoney);
//        model.addAttribute("itemMapList", itemMapList);
//        model.addAttribute("storageMoney", storageMoney);

        return "/searchInfo";
    }
}
