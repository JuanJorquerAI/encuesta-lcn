# Imagen para construir/servir Jekyll
FROM ruby:3.3-alpine
RUN apk add --no-cache build-base git
WORKDIR /app
COPY Gemfile Gemfile.lock* ./
RUN bundle install
COPY . .
EXPOSE 4000
CMD ["bundle","exec","jekyll","serve","--host","0.0.0.0","--livereload"]
