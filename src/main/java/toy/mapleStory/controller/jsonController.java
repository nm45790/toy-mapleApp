package toy.mapleStory.controller;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins="*", allowedHeaders="*") /* CORS 어노테이션 */
@RestController
public class jsonController {

    @GetMapping(value="/callApi")
    public String frontCallApi(){
        System.out.println("!!");
        List<JSONObject> json = new ArrayList<JSONObject>();
        JSONObject i = new JSONObject();
        JSONObject j = new JSONObject();

        i.put("1", "b");
        i.put("2", "d");
        i.put("3", "f");

        j.put("4", "b");
        j.put("5", "d");
        j.put("6", "f");

        json.add(i);
        json.add(j);

        System.out.println(json);

        return json.toString();
    }

}

