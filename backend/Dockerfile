FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /src

COPY src/RegistrationApp.Core/RegistrationApp.Core.csproj src/RegistrationApp.Core/
COPY src/RegistrationApp.Contracts/RegistrationApp.Contracts.csproj src/RegistrationApp.Contracts/
COPY src/RegistrationApp.Infrastructure/RegistrationApp.Infrastructure.csproj src/RegistrationApp.Infrastructure/
COPY src/RegistrationApp.Api/RegistrationApp.Api.csproj src/RegistrationApp.Api/
RUN dotnet restore src/RegistrationApp.Api/RegistrationApp.Api.csproj

COPY src/ src/
RUN dotnet publish src/RegistrationApp.Api/RegistrationApp.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS runtime
WORKDIR /app

RUN mkdir -p /app/data /app/wwwroot/uploads/photos

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 5000
ENTRYPOINT ["dotnet", "RegistrationApp.Api.dll"]
