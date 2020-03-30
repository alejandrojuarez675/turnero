package com.sanatorio.espanol.backend.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

class DateHandler extends StdDeserializer<Date> {

 public DateHandler() {
   this(null);
 }

 public DateHandler(Class<?> clazz) {
   super(clazz);
 }

 @Override
 public Date deserialize(JsonParser jsonparser, DeserializationContext context)
     throws IOException {
   String date = jsonparser.getText();
   try {
     SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
     return sdf.parse(date);
   } catch (Exception e) {
     return null;
   }
 }

}