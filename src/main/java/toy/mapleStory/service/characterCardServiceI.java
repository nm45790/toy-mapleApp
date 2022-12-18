package toy.mapleStory.service;

import org.json.simple.JSONObject;

import java.io.IOException;

public interface characterCardServiceI {
    public abstract JSONObject getUserInfo(String name) throws InterruptedException;
    public abstract void saveBinFile(String name, JSONObject j) throws IOException;
}
