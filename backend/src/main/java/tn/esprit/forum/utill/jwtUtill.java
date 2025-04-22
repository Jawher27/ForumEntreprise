package tn.esprit.forum.utill;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.apache.el.lang.FunctionMapperImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.Claims;

@Component
public class jwtUtill {




    //public static final String SECRET = "5364584521265655426";
   private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private String createToken(Map<String, Object> claims, String Username) {
        return Jwts.builder().setClaims(claims).setSubject(Username).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 90))
                .signWith(SignatureAlgorithm.HS256, getSignKey()).compact();
    }

    private Key getSignKey() {

        return Keys.secretKeyFor(SignatureAlgorithm.HS256);

    }

    public String generateToken (UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }



    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(getSignKey())
                .parseClaimsJwt(token).getBody();
    }




    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public Date extractExpiration (String token){
        return extractClaim(token, Claims::getExpiration);
    }
    public String extractUsername(String token ){
        return extractClaim(token , Claims::getSubject);
    }
    private Boolean isTokenExpired (String token ){
        return extractExpiration(token).before(new Date());

    }
    public Boolean validateToken (String token , UserDetails userDetails){
        final String username =extractUsername(token);
        return (username.equals(userDetails.getUsername())&& ! isTokenExpired(token));
    }

}