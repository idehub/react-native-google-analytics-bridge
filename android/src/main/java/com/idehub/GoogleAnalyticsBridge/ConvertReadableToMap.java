package com.idehub.GoogleAnalyticsBridge;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

/**
 * Converts a ReadableMap to a HashMap<String, Object>
 */
public class ConvertReadableToMap {

    public static HashMap<String, Object> getMap(ReadableMap dictionary) {
        HashMap<String, Object> parsedMap = new HashMap<String, Object>();
        ReadableMapKeySetIterator iterator = dictionary.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = dictionary.getType(key);
            switch (type) {
                case Null:
                    parsedMap.put(key, null);
                    break;
                case Boolean:
                    parsedMap.put(key, dictionary.getBoolean(key));
                    break;
                case Number:
                    parsedMap.put(key, dictionary.getDouble(key));
                    break;
                case String:
                    parsedMap.put(key, dictionary.getString(key));
                    break;
                case Map:
                    parsedMap.put(key, ConvertReadableToMap.getMap(dictionary.getMap(key)));
                    break;
                case Array:
                    parsedMap.put(key, ConvertReadableToMap.getArray(dictionary.getArray(key)));
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert of type: " + type + " and key: " + key + ".");
            }
        }
        return parsedMap;
    }

    private static List<Object> getArray(ReadableArray readableArray) {
        List<Object> parsedList = new ArrayList<Object>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            switch(type) {
                case Null:
                    parsedList.add(i, null);
                    break;
                case Boolean:
                    parsedList.add(i, readableArray.getBoolean(i));
                    break;
                case Number:
                    parsedList.add(i, readableArray.getDouble(i));
                    break;
                case String:
                    parsedList.add(i, readableArray.getString(i));
                    break;
                case Map:
                    parsedList.add(i, ConvertReadableToMap.getMap(readableArray.getMap(i)));
                    break;
                case Array:
                    parsedList.add(i, ConvertReadableToMap.getArray(readableArray.getArray(i)));
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert of type: " + type + " and index: " + i + ".");
            }
        }
        return parsedList;
    }
}
